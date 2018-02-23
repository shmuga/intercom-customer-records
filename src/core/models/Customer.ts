import { Location } from './Location';

export class Customer {
    private _userId: number;
    private _name: string;
    private _location: Location;

    get location(): Location {
        return this._location;
    }
    get name(): string {
        return this._name;
    }
    get userId(): number {
        return this._userId;
    }

    constructor(userId: number, name: string, location: Location) {
        this._userId = userId;
        this._name = name;
        this._location = location;
    }
}
