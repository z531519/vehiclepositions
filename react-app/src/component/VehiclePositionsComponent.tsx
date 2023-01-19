"use client"
import * as React from 'react';
import { DataGrid, GridColumns } from '@mui/x-data-grid';

import { useRouter } from 'next/navigation';

import { Button, Grid } from '@mui/material';
import { useVehiclePositionService } from '../services/ServiceHook';
import { ConfigProperties } from '../services/Config';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

export default function VehiclePositionsComponent() {  
  const vehiclePositionService = useVehiclePositionService(ConfigProperties());
  const router = useRouter();

  const [serviceData, setServiceData] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {    
              
    vehiclePositionService?.fetchVehiclePositions().then((data) => {
      enqueueSnackbar(`Loaded Vehicles`);
      const list =  data.map((i: any) => ({ id: i, veh: i }));
      setServiceData(list);
    });   
  }, [vehiclePositionService]);

  

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', width: 250, align: "center", headerAlign: "center" },
    {
      field: 'view', headerName: 'Actions', width: 400, align: "center", headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => {
                  handleLocViewClick(event, cellValues);
                }}
              >
                View Locations
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => {
                  handleGeoClick(event, cellValues);
                }}
              >
                Geo View
              </Button>
            </Grid>
          </Grid>
        );
      }
    },
  ];


  const handleLocViewClick = (event: any, cellValues: any) => {
    router.push(`/vehicles/${cellValues.id}/loc`);
  };

  const handleGeoClick = (event: any, cellValues: any) => {
    router.push(`/vehicles/${cellValues.id}/geo`);
  }
  return (
    <div style={{ height: 600, width: '100%' }}>
      
      {serviceData && serviceData.length > 0 && 
      <DataGrid
        rows={serviceData}
        columns={columns}
        pageSize={25}
      />
      }
    </div>
  );
}