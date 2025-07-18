import { VehicleMinimal } from "./vehicle-minimal";

export interface Maintenance {
    id: number,
    vehicle: VehicleMinimal,
    startDate: string,
    endDate: string
}