import { DataGrid, GridRowId, GridRowIdGetter } from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VehiclePosition from '../model/VehiclePosition';
import { useVehiclePositionService } from '../services/ServiceHook';
import { fetchVehiclePositionLocations } from '../services/VehiclePositionService';
import VehiclePositionLocationHeader from './VehiclePositionLocationHeader';


export default function VehiclePositionLocations() {
  const vehiclePositionService = useVehiclePositionService( {
    base: 'http://localhost:8080'
  });
  
  const [serviceData, setServiceData] = useState<VehiclePosition[]>([]);

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      vehiclePositionService?.fetchVehiclePositionLocations(id).then((data) => {
        setServiceData(data);
      });
    }
  }, [id, vehiclePositionService])

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

  return (
    <div>
      <VehiclePositionLocationHeader vehiclePosition={serviceData[0]} />
      <div style={{ height: 400, width: '100%' }}>

        <DataGrid
          rows={serviceData}
          columns={columns}
          // pageSize={25}
          getRowId={getRowId}          
        />
      </div>
    </div>

  );
}