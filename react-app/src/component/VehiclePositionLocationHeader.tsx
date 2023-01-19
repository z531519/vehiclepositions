
import * as React from 'react';
import Typography from '@mui/material/Typography';

import { useVehiclePositionService } from '../services/ServiceHook';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid } from '@mui/material';
import { useState } from 'react';
import { ConfigProperties } from '../services/Config';

interface Props {
  veh: string;
  onChangeOday(event: SelectChangeEvent<string> | undefined, oday: string): void;
}
export default function VehiclePositionLocationHeader({ veh, onChangeOday }: Props) {
  const vehiclePositionService = useVehiclePositionService(ConfigProperties());
  const [serviceData, setServiceData] = useState<string[]>([]);
  const [selectedOday, setSelectedOday] = useState<string>();


  React.useEffect(() => {
    if (veh) {
      vehiclePositionService?.fetchVehiclePositionOdays(veh).then((data) => {
        setServiceData(data);
        setSelectedOday(data[0]);
        onChangeOday(undefined, data[0]);
      });
    }
  }, [veh, vehiclePositionService])

  const onOdayChange = (event: SelectChangeEvent<string>, child: React.ReactNode): any => {
    setSelectedOday(event.target.value);
    onChangeOday(event, event.target.value);
  }

  return (
    <React.Fragment>
      <Grid container maxWidth={500} padding={2} >
        <Grid item xs={3}>
      <Typography component="p" variant="h5">Vehicle ID</Typography>
        </Grid>
        <Grid item xs={2}>
      <Typography component="p" variant="h5">
        {veh}
      </Typography>
      </Grid>
      
      {serviceData.length > 0 &&
      <Grid item xs={7}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Days</InputLabel>
          <Select
            // defaultValue={selectedOday??""}
            value={selectedOday ?? ""}
            label="Days"
            onChange={onOdayChange}
          >
            {serviceData.map((row: any) => (
              <MenuItem key={row} value={row}>{row}</MenuItem>
            ))
            }
          </Select>
        </FormControl>
        </Grid>
      }
      </Grid>
    </React.Fragment>
  );
}
