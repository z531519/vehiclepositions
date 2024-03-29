import { useEffect, useState } from 'react';
import { ConfigProps } from './Config';
import VehiclePositionService, { IVehiclePositionService } from './VehiclePositionService';

export interface ServiceParams {
  base:string
}
/**
 * This use function handles most of the messy interaction between Amplience's SDK and
 * services that handle page references.
 *
 * @param installationParameters parameters passed in during initialization of sdk
 * @returns translationService
 */
export function useVehiclePositionService(
  configProps: ConfigProps
): IVehiclePositionService | undefined {
  const [vehiclePositionService, setVehiclePositionService] = useState<
  IVehiclePositionService
  >();

  /**
   * This effect is responsible for actually instantiating a new service.
   */
  useEffect(() => {
    //todo: this would probably "new up" a service with the host and any other initial
    // values
    
    setVehiclePositionService(new VehiclePositionService(configProps?.base as string));
 
  }, [configProps?.base]);

  return vehiclePositionService;
}
