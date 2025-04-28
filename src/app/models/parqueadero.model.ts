export interface Parqueadero {
  idParking: number;
  name: string;
  address: string;
  priceParking: number;
  totalCapacity: number;
  totalSpecialPlace: number;
  totalAvaliablePlace: number;
  urlImg?: string;
  totalMoney?: number;
}
