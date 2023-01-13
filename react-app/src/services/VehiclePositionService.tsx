import VehiclePosition from "../model/VehiclePosition";

export interface IVehiclePositionService {

  fetchVehiclePositions(): Promise<number[]>;

  fetchVehiclePositionOdays(veh: string): Promise<string[]>;

  fetchVehiclePositionLocations(veh: string, oday:string): Promise<VehiclePosition[]>;

  fetchVehiclePositionGeoJson(id: string, oday:string): Promise<any>
}



export default class VehiclePositionService implements IVehiclePositionService {

  base:string;

  constructor(base:string) {
    this.base = base;
  }

  async fetchVehiclePositions(): Promise<number[]> {    
    const response = await fetch(`${this.base}/vehicle/positions`);
    return response.json();
  }

  async fetchVehiclePositionOdays(veh: string): Promise<string[]> {    
    const response = await fetch(`${this.base}/vehicle/positions/${veh}`);
    return response.json();
  }

  async fetchVehiclePositionLocations(veh: string, oday:string): Promise<VehiclePosition[]> {
    const response = await fetch(`${this.base}/vehicle/positions/${veh}/${oday}`);
    return response.json();
  }

  async fetchVehiclePositionGeoJson(id: string, oday:string): Promise<any> {
    const response = await fetch(`${this.base}/vehicle/positions/${id}/${oday}/geojson`);
    return response.json();
  }
}