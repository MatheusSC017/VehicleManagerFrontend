import { VehicleMinimal } from "./vehicle-minimal";

export interface Maintenance {
    id: number,
    vehicle: VehicleMinimal,
    additionalInfo: string,
    startDate: string,
    endDate: string
}