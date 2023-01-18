import * as React from 'react';
import VehiclePositionLocations from '../../../../src/component/VehiclePositionLocations';


export default function Page({params}:any) {  
  return (
    <VehiclePositionLocations veh={params.veh}/>
  );
}
