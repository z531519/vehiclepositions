import { GridRowId, GridRowIdGetter } from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import VehiclePosition from '../model/VehiclePosition';
import VehiclePositionLocationHeader from './VehiclePositionLocationHeader';
import { useVehiclePositionService } from '../services/ServiceHook';
import { FormControl, InputLabel, MenuItem, PopoverPosition, Select, SelectChangeEvent, Toolbar } from '@mui/material';
import { useSnackbar } from 'notistack';
import VehiclePositionGeoMap from './VehiclePositionGeoMap';


interface filter {
  jrn: string;
  dir: string;
}

export default function VehiclePositionGeoView() {
  const vehiclePositionService = useVehiclePositionService({
    base: 'http://localhost:8080'
  });

  const geoJsonSample = {
    type: "FeatureCollection",
    features: [],
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [serviceData, setServiceData] = useState<any>(geoJsonSample);
  const [geoJsonData, setGeoJsonData] = useState<any>(geoJsonSample);
  const [oday, setOday] = useState<string>();
  const [jrns, setJrns] = useState<string[]>([]);
  const [dirs, setDirs] = useState<string[]>([]);
  const [filter, setFilter] = useState<filter>({jrn:"None", dir: "None"});

  let { id = "" } = useParams();

  useEffect(() => {
    if (id && oday) {
      vehiclePositionService?.fetchVehiclePositionGeoJson(id, oday).then((data) => {
        setServiceData(data);
        filterData(data);
        enqueueSnackbar(`Loaded Geo for ${oday}`);
        
        const jrns = data.features.map((item:any) => item.properties.jrn).filter((v: any,i: any,a: string | any[])=>a.indexOf(v)==i)
        setJrns(jrns);
        setDirs( data.features.map((item:any) => item.properties.dir).filter((v: any,i: any,a: string | any[])=>a.indexOf(v)==i));
        
      });
    }
  }, [id, oday, vehiclePositionService])

  const getRowId: GridRowIdGetter<VehiclePosition> = (item: VehiclePosition): GridRowId => {
    return item.tsi;
  }

  const getCenter = (): [number, number] => {
    const totalFeatures = serviceData?.features.length;

    const coordinates = serviceData?.features[Math.round(totalFeatures / 2) - 1].geometry.coordinates
    return [coordinates[1], coordinates[0]];

  }
  
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

  const filterData = (data:any):void => {
    setGeoJsonData(geoJsonSample);
    const {jrn, dir} = filter;

    const allFeatures = [...data.features];
    const filtered = allFeatures.filter((item:any) => {
      let inc:boolean = true;
      if (jrn && jrn != "None"){ 
        inc = inc && item.properties.jrn == jrn
      }
      if (dir && dir != "None"){ 
        inc = inc && item.properties.dir == dir
      }
      return inc;
    })
    geoJsonData.features = filtered;
    setGeoJsonData({...geoJsonData});
  
    console.log(geoJsonData.features.length);
  }

  return (
    <div>
      <VehiclePositionLocationHeader veh={id} onChangeOday={onOdayChange} />
      {oday && oday != "" && serviceData.features.length > 0 &&
        (
          <div>
            <Toolbar/>
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
            
            <VehiclePositionGeoMap geoJsonData={geoJsonData}/>
            

          </div>
        )
      }
      
    </div>

  )
}