import { Client } from "./client";
import { VehicleMinimal } from "./vehicle-minimal";

export interface Sale {
    id: number,
    client: Client,
    vehicle: VehicleMinimal,
    saleDate: string,
    reserveDate: string,
    status: string,
}