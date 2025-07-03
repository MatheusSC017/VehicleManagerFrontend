export interface Financing {
    id: number,
    client: any,
    vehicle: any,
	totalAmount: number,
    downPayment: number,
    installmentCount: number,
    installmentValue: number,
    annualInterestRate: number,
    contractDate: string,
    firstInstallmentDate: string,
    financingStatus: string,
}