'use client'

import * as React from 'react';
import VehiclePositionGeoView from '../../../../src/component/VehiclePositionGeoView';


export default function Page({params}:any) {
  return (
    <VehiclePositionGeoView veh={params.veh}/>
  );
}
