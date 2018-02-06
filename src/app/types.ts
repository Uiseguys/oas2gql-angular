export type Driver = {
	_id: number;
	firstName: string;
	lastName: string;
};

export type Vehicle = {
	_id: number;
	name: string;
};

export type Query = {
	getAllDrivers: Driver[];
	getAllVehicles: Vehicle[];
};
