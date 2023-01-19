'use client'

import { Button, Grid, SelectChangeEvent } from '@mui/material';
import { DataGrid, GridRowId, GridRowIdGetter } from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect, useState } from 'react';
import VehiclePosition from '../model/VehiclePosition';
import { useVehiclePositionService } from '../services/ServiceHook';
import VehiclePositionLocationHeader from './VehiclePositionLocationHeader';
import { useSnackbar } from 'notistack';
import { ConfigProperties } from '../services/Config';

export default function VehiclePositionLocations({veh}:any) {
  const vehiclePositionService = useVehiclePositionService(ConfigProperties());

  const { enqueueSnackbar } = useSnackbar();
  const [serviceData, setServiceData] = useState<VehiclePosition[]>([]);
  const [oday, setOday] = useState<string>();

  useEffect(() => {    
    if (veh && oday) {
      vehiclePositionService?.fetchVehiclePositionLocations(veh, oday).then((data) => {
        setServiceData(data);
        enqueueSnackbar(`Loaded locations for ${oday}`);
      });
    }
  }, [veh, oday, vehiclePositionService, enqueueSnackbar])

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

  const onOdayChange = (event: SelectChangeEvent<string>, oday: string): any => {
    setOday(oday);
  }

  return (
    <Grid container >
      <Grid container width={800}  justifyContent="center" alignItems="center">
        <Grid item xs={8}>
          <VehiclePositionLocationHeader veh={veh} onChangeOday={onOdayChange} />
        </Grid>
        <Grid item xs={2}>
          <Button href={`/vehicles/${veh}/geo`}
            variant="contained"
            color="primary"
          >View Geo</Button>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={serviceData}
            columns={columns}
            getRowId={getRowId}
          />
        </div>
      </Grid>
    </Grid>

  );
}