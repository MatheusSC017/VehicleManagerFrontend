import { Image } from "./image"

export interface VehicleMultImages {
    id: number,
	vehicleType: string,
	vehicleStatus: string,
	model: string,
	brand: string,
	year: number,
	color: string,
	plate: string,
	chassi: string,
	mileage: number,
	price: number,
	vehicleFuel: string,
	vehicleChange: string,
	doors: number,
	motor: string,
	power: string,
	images: Image[]
}