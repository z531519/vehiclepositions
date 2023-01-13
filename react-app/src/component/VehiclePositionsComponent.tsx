import * as React from 'react';
import { DataGrid, GridColumns, GridEventListener } from '@mui/x-data-grid';

import { useState, useEffect } from 'react';


import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { useVehiclePositionService } from '../services/ServiceHook';


export default function VehiclePositionsComponent() {
  const vehiclePositionService = useVehiclePositionService( {
    base: 'http://localhost:8080'
  });

  const [serviceData, setServiceData] = useState<any[]>([]);
  const navigate = useNavigate();
  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', width: 170, align:"center", headerAlign:"center" },
    {
      field: 'view', headerName: 'Actions', width: 400, align:"center", headerAlign:"center", 
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
    navigate(`/vehicles/${cellValues.id}`);
  };

  const handleGeoClick = (event: any, cellValues: any) => {
    console.log(cellValues);
    // window.open(`http://localhost:8080/vehicle/positions/${cellValues.id}/geo`, '_blank', 'noreferrer');
    navigate(`/vehicles/${cellValues.id}/geo`);
  }

  useEffect(() => {    
    vehiclePositionService?.fetchVehiclePositions().then((data) => {
      setServiceData(data.map((i: any) => ({ id: i, veh: i })));
    });
  }, [vehiclePositionService])

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={serviceData}
        columns={columns}
        pageSize={25}
      />
    </div>
  );
}