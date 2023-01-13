import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItem from '@mui/material/ListItem';
import { Link } from '@mui/material';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { useNavigate } from 'react-router';


export const mainListItems = (
  <React.Fragment>
    <ListItemButton LinkComponent={Link} href="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>

    <ListItemButton LinkComponent={Link} href="/vehicles">
      <ListItemIcon>
        <DirectionsCarFilledIcon />
      </ListItemIcon>
      <ListItemText primary="Vehicle Positions" />
    </ListItemButton>

  </React.Fragment>
);

