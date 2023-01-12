import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItem from '@mui/material/ListItem';
import { Link } from '@mui/material';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

export const mainListItems = (
  <React.Fragment>
     <ListItem>
      <DashboardIcon />
        <Link href="/" >
          <ListItemText primary="Dashboard" />
        </Link>
      </ListItem>
    
    <ListItemButton >
      <ListItemIcon>
        <DirectionsCarFilledIcon />
      </ListItemIcon>
      <Link href="/vehicles">
      <ListItemText primary="Vehicle Positions" />
      </Link>
      
    </ListItemButton>
  
  </React.Fragment>
);

