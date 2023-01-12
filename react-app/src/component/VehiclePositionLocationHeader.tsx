import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './dashboard/Title';
import VehiclePosition from '../model/VehiclePosition';

interface Props {
  vehiclePosition: VehiclePosition;
} 
export default function VehiclePositionLocationHeader({vehiclePosition}: Props) {
  
  return (
    <React.Fragment>
      <Title>Vehicle ID</Title>
      <Typography component="p" variant="h4">
        {vehiclePosition?.veh}
      </Typography>  
    </React.Fragment>
  );
}
