import * as React from 'react';
import { useEffect, useState } from 'react';

import VehiclePositionLocationHeader from './VehiclePositionLocationHeader';
import { useVehiclePositionService } from '../services/ServiceHook';
import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import VehiclePositionGeoMap from './VehiclePositionGeoMap';
import { ConfigProperties } from '../services/Config';



export default function VehiclePositionGeoView({veh}:any) {
  const vehiclePositionService = useVehiclePositionService({
    base: ConfigProperties().base,
  });

  const geoJsonSample = {
    type: "FeatureCollection",
    features: [],
  };

  const { enqueueSnackbar } = useSnackbar();
  const [serviceData, setServiceData] = useState<any>(geoJsonSample);
  const [geoJsonData, setGeoJsonData] = useState<any>(geoJsonSample);
  const [oday, setOday] = useState<string>();
  const [jrns, setJrns] = useState<string[]>([]);
  const [dirs, setDirs] = useState<string[]>([]);
  const [opers, setOpers] = useState<string[]>([]);
  const [routes, setRoutes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const filter = {
    jrn: "None",
    dir: "None",
    oper: "None",
    route: "None",
  };

  useEffect(() => {
    if (veh && oday) {
      setLoading(true);
      vehiclePositionService?.fetchVehiclePositionGeoJson(veh, oday).then((data) => {
        setServiceData(data);
        filterData(data);
        enqueueSnackbar(`Loaded Geo for ${oday}`);

        setJrns(data.features.map((item: any) => item.properties.jrn).filter((v: any, i: any, a: string | any[]) => a.indexOf(v) === i));
        setDirs(data.features.map((item: any) => item.properties.dir).filter((v: any, i: any, a: string | any[]) => a.indexOf(v) === i));
        setOpers(data.features.map((item: any) => item.properties.oper).filter((v: any, i: any, a: string | any[]) => a.indexOf(v) === i));
        setRoutes(data.features.map((item: any) => item.properties.route).filter((v: any, i: any, a: string | any[]) => a.indexOf(v) === i));
        setLoading(false);
      });
    }
  }, [veh, oday, vehiclePositionService, enqueueSnackbar])


  const onOdayChange = (event: SelectChangeEvent<string>, oday: string): any => {
    setOday(oday);
  }

  const onJrnChange = (event: SelectChangeEvent<string>, child: React.ReactNode): any => {
    filter.jrn = event.target.value;
    filterData(serviceData);
  }

  const onDirChange = (event: SelectChangeEvent<string>, child: React.ReactNode): any => {
    filter.dir = event.target.value;
    filterData(serviceData);
  }

  const onOperChange = (event: SelectChangeEvent<string>, child: React.ReactNode): any => {
    filter.oper = event.target.value;
    filterData(serviceData);
  }

  const onRouteChange = (event: SelectChangeEvent<string>, child: React.ReactNode): any => {
    filter.route = event.target.value;
    filterData(serviceData);
  }

  const filterData = (data: any): void => {
    setGeoJsonData(geoJsonSample);
    const { jrn, dir, route, oper } = filter;

    const allFeatures = [...data.features];
    const filtered = allFeatures.filter((item: any) => {
      let inc: boolean = true;
      if (jrn && jrn !== "None") {
        inc = inc && item.properties.jrn === jrn
      }
      if (dir && dir !== "None") {
        inc = inc && item.properties.dir === dir
      }
      if (route && route !== "None") {
        inc = inc && item.properties.route === route
      }
      if (oper && oper !== "None") {
        inc = inc && item.properties.oper === oper
      }
      return inc;
    })
    geoJsonData.features = filtered;
    setGeoJsonData({ ...geoJsonData });

    console.log(geoJsonData.features.length);
  }

  return (
    <Grid container padding={2} >
      <Grid item xs={5} border={'black'}>
        <VehiclePositionLocationHeader veh={veh} onChangeOday={onOdayChange} />
      </Grid>
      
          <Grid container item  xs={7} padding={2} rowGap={2}>
            <Grid container>
              <Typography>More Filters:</Typography>
            </Grid>
            <Grid container item xs={6} >
              <Grid item xs={3}>
                <FormControl size='small'>
                  <InputLabel id="demo-simple-select-label">jrn</InputLabel>
                  <Select defaultValue="None"
                    label="jrn"
                    onChange={onJrnChange}>
                    <MenuItem value="None">None</MenuItem>
                    {jrns.map((row: any) => (
                      <MenuItem key={row} value={row}>{row}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl size='small'>
                  <InputLabel id="demo-simple-select-label">dirs</InputLabel>
                  <Select defaultValue="None"
                    label="dirs"
                    onChange={onDirChange}
                  >
                    <MenuItem value="None">None</MenuItem>
                    {dirs.map((row: any) => (
                      <MenuItem key={row} value={row}>{row}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl size='small'>
                  <InputLabel id="demo-simple-select-label">oper</InputLabel>
                  <Select defaultValue="None"
                    label="opers"
                    onChange={onOperChange}
                  >
                    <MenuItem value="None">None</MenuItem>
                    {opers.map((row: any) => (
                      <MenuItem key={row} value={row}>{row}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl size='small'>
                  <InputLabel id="demo-simple-select-label">routes</InputLabel>
                  <Select defaultValue="None"
                    label="routes"
                    onChange={onRouteChange}
                  >
                    <MenuItem value="None">None</MenuItem>
                    {routes.map((row: any) => (
                      <MenuItem key={row} value={row}>{row}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </Grid>

            </Grid>
            {loading && (
              <CircularProgress />                
            )}
          </Grid>
          <Grid item xs={12}>
          
          <VehiclePositionGeoMap geoJsonData={geoJsonData} />
        </Grid>
      
    </Grid>

  )
}