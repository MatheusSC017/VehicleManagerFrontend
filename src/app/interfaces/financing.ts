export interface Financing {
    id: number,
    client: number,
    vehicle: number,
	totalAmount: number,
    downPayment: number,
    installmentCount: number,
    installmentValue: number,
    annualInterestRate: number,
    contractDate: string,
    firstInstallmentDate: string,
    financingStatus: string,
}