import * as React from 'react';
import { DataGrid, GridColumns, GridEventListener } from '@mui/x-data-grid';

import { useState, useEffect } from 'react';

import { fetchVehiclePositions } from '../services/VehiclePositionService';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useVehiclePositionService } from '../services/ServiceHook';


export default function VehiclePositionsComponent() {
  const vehiclePositionService = useVehiclePositionService( {
    base: 'http://localhost:8080'
  });

  const [serviceData, setServiceData] = useState<any[]>([]);
  const navigate = useNavigate();
  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'view', headerName: 'Actions', width: 400, renderCell: (cellValues) => {
        return (
          <div>
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleLocViewClick(event, cellValues);
            }}
          >
            View Locations
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleGeoClick(event, cellValues);
            }}
          >
            Geo View
          </Button>
          </div>
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