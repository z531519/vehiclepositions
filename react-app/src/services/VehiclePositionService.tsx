import VehiclePosition from "../model/VehiclePosition";

export const fetchVehiclePositions = async function (): Promise<number[]> {
  const response = await fetch('http://localhost:8080/vehicle/positions');
  return response.json();
}

export const fetchVehiclePositionLocations = async function (id: string): Promise<VehiclePosition[]> {
  const response = await fetch(`http://localhost:8080/vehicle/positions/${id}`);
  return response.json();
}

export const fetchVehiclePositionGeoJson = async function (id: string): Promise<any> {
  const response = await fetch(`http://localhost:8080/vehicle/positions/${id}/geojson`);
  return response.json();
}


export interface IVehiclePositionService {

  fetchVehiclePositions(): Promise<number[]>;

  fetchVehiclePositionLocations(id: string): Promise<VehiclePosition[]>;

  fetchVehiclePositionGeoJson(id: string): Promise<any>
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

  async fetchVehiclePositionLocations(id: string): Promise<VehiclePosition[]> {
    const response = await fetch(`${this.base}/vehicle/positions/${id}`);
    return response.json();
  }

  async fetchVehiclePositionGeoJson(id: string): Promise<any> {
    const response = await fetch(`${this.base}/vehicle/positions/${id}/geojson`);
    return response.json();
  }
}