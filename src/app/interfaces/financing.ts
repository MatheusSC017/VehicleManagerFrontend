import { Client } from "./client";
import { VehicleMinimal } from "./vehicle-minimal";

export interface Financing {
    id: number,
    client: Client,
    vehicle: VehicleMinimal,
	totalAmount: number,
    downPayment: number,
    installmentCount: number,
    installmentValue: number,
    annualInterestRate: number,
    contractDate: string,
    firstInstallmentDate: string,
    financingStatus: string,
}