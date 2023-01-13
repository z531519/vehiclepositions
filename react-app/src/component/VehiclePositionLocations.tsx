import { Button, SelectChangeEvent } from '@mui/material';
import { DataGrid, GridRowId, GridRowIdGetter } from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import VehiclePosition from '../model/VehiclePosition';
import { useVehiclePositionService } from '../services/ServiceHook';
import VehiclePositionLocationHeader from './VehiclePositionLocationHeader';
import { useSnackbar } from 'notistack';

export default function VehiclePositionLocations() {
  const vehiclePositionService = useVehiclePositionService( {
    base: 'http://localhost:8080'
  });
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [serviceData, setServiceData] = useState<VehiclePosition[]>([]);
  const [oday, setOday] = useState<string>();

  let { id = ""} = useParams();

  useEffect(() => {
    if (id && oday) {
      vehiclePositionService?.fetchVehiclePositionLocations(id, oday).then((data) => {
        setServiceData(data);
        enqueueSnackbar(`Loaded locations for ${oday}`);
      });
    }
  }, [id, oday, vehiclePositionService])

  const getRowId: GridRowIdGetter<VehiclePosition> = (item: VehiclePosition): GridRowId => {
    return item.tsi;
  }

  const columns = [
    { field: 'tsi', headerName: 'ID', width: 170 },
    { field: 'tst', headerName: 'TST', width: 200 },
    { field: 'lat', headerName: 'LAT', width: 170 },
    { field: 'long', headerName: 'LONG', width: 170 },
    { field: 'spd', headerName: 'SPD', width: 170 },
    { field: 'route', headerName: 'ROUTE', width: 170 },
    { field: 'oday', headerName: 'ODAY', width: 170 },
    { field: 'start', headerName: 'START', width: 170 }
  ];

  const onOdayChange = (event: SelectChangeEvent<string>, oday:string):any => {
    setOday(oday);
  }

  return (
    <div>
      <VehiclePositionLocationHeader veh={id} onChangeOday={onOdayChange} />
      <div style={{ height: 400, width: '100%' }}>
        <Link to={ `/vehicles/${id}/geo`}>View Geo</Link>
        <DataGrid
          rows={serviceData}
          columns={columns}
          getRowId={getRowId}          
        />
      </div>
    </div>

  );
}