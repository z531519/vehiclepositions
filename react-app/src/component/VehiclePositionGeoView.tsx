import { DataGrid, GridRowId, GridRowIdGetter } from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Map, Marker, GeoJson, GeoJsonLoader, GeoJsonFeature } from "pigeon-maps"

import VehiclePosition from '../model/VehiclePosition';
import { fetchVehiclePositionGeoJson, fetchVehiclePositionLocations } from '../services/VehiclePositionService';
import VehiclePositionLocationHeader from './VehiclePositionLocationHeader';
import { useVehiclePositionService } from '../services/ServiceHook';


export default function VehiclePositionGeoView() {
  const vehiclePositionService = useVehiclePositionService( {
    base: 'http://localhost:8080'
  });
  
  const geoJsonSample = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [2.0, 48.5] },
        properties: { prop0: "value0" },
      },
    ],
  };

  const [serviceData, setServiceData] = useState<any>(geoJsonSample);

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      vehiclePositionService?.fetchVehiclePositionGeoJson(id).then((data) => {
        setServiceData(data);
      });
    }
  }, [id, vehiclePositionService])

  const getRowId: GridRowIdGetter<VehiclePosition> = (item: VehiclePosition): GridRowId => {
    return item.tsi;
  }

  const columns = [
    { field: 'tsi', headerName: 'ID', width: 170 },
    { field: 'tst', headerName: 'TST', width: 200 },
    { field: 'lat', headerName: 'LAT', width: 170 },
    { field: 'long', headerName: 'LONG', width: 170 },
    { field: 'spd', headerName: 'SPD', width: 170 },
    { field: 'route', headerName: 'ROUTE', width: 170 },
    { field: 'oday', headerName: 'ODAY', width: 170 },
    { field: 'start', headerName: 'START', width: 170 }
  ];

  const geoJsonLink = "http://localhost:8080/vehicle/positions/1147/geojson"

  const getCenter = (): [number, number] => {
    const totalFeatures = serviceData?.features.length;

    const coordinates = serviceData?.features[Math.round(totalFeatures / 2) - 1].geometry.coordinates
    return [coordinates[1], coordinates[0]];
  }

  return (
    <div>
      <VehiclePositionLocationHeader vehiclePosition={{ veh: Number(id) } as VehiclePosition} />
      <Map height={600} defaultZoom={12}
        center={getCenter()}>
        <GeoJson
          data={serviceData}
          styleCallback={(feature: { geometry: { type: string; }; }, hover: any) => {
            if (feature.geometry.type === "LineString") {
              return { strokeWidth: "1", stroke: "black" };
            }
            return {
              fill: "#d4e6ec99",
              strokeWidth: "2",
              stroke: "red",
              r: "2",
            };
          }}
        />
        {/* <GeoJson
          data={geoJsonFeatureSample}          
          styleCallback={(feature: { geometry: { type: string; }; }, hover: any) => {
            if (feature.geometry.type === "LineString") {
              return { strokeWidth: "1", stroke: "black" };
            }
            return {
              fill: "#d4e6ec99",

              strokeWidth: "2",
              stroke: "red",
              r: "4",
            };
          }}      
        />     */}
      </Map>
    </div>

  )
}