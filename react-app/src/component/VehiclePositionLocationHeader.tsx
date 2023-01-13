import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './dashboard/Title';
import VehiclePosition from '../model/VehiclePosition';
import { useVehiclePositionService } from '../services/ServiceHook';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useParams } from 'react-router';
import { useState } from 'react';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

interface Props {
  veh: string;
  onChangeOday(event: SelectChangeEvent<string> | undefined, oday: string): void;
}
export default function VehiclePositionLocationHeader({ veh, onChangeOday }: Props) {
  const vehiclePositionService = useVehiclePositionService({
    base: 'http://localhost:8080'
  });
  const [serviceData, setServiceData] = useState<string[]>([]);
  const [selectedOday, setSelectedOday] = useState<string>();

  let { id } = useParams();

  React.useEffect(() => {
    if (id) {
      vehiclePositionService?.fetchVehiclePositionOdays(id).then((data) => {
        setServiceData(data);
        setSelectedOday(data[0]);
        onChangeOday(undefined, data[0]);
      });
    }
  }, [id, vehiclePositionService])

  const onOdayChange = (event: SelectChangeEvent<string>, child: React.ReactNode): any => {
    setSelectedOday(event.target.value);
    onChangeOday(event, event.target.value);
  }

  return (
    <React.Fragment>
      <Title>Vehicle ID</Title>
      <Typography component="p" variant="h4">
        {veh}
      </Typography>
      {serviceData.length > 0 &&
        <FormControl fullWidth>
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
      }
    </React.Fragment>
  );
}
