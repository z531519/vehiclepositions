'use client'

import * as React from 'react';
import Typography from '@mui/material/Typography';

import { useVehiclePositionService } from '../services/ServiceHook';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid } from '@mui/material';
import { useState } from 'react';
import { ConfigProperties, setBase } from '../services/Config';

export default function VehiclePositionConfig({ base }: any) {

  setBase(base);

  return (
    <React.Fragment>
      
    </React.Fragment>
  );
}
