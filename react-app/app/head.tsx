import { useSearchParams } from "next/navigation";
import React from "react";
import { cookies } from 'next/headers';
import VehiclePositionConfig from '../src/component/VehiclePositionConfig';

async function getEnvironment() {
  return {
    base: process.env.API_URL || 'http://localhost:8080'    
  }
}

export default async function Head() {
  const nextCookies = cookies();
  const props = await getEnvironment();
  
  return (
    <>
      <title></title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <VehiclePositionConfig base={props.base}/>
    </>
  )
}
