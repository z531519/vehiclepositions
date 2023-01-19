'use client'

import * as React from 'react';

import { setBase } from '../services/Config';

/**
 * Blank Component to load configuration
 *
 * @returns 
 */
export default function VehiclePositionConfig({ base }: any) {

  setBase(base);

  return (
    <React.Fragment>      
    </React.Fragment>
  );
}
