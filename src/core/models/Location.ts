import { Coordinates } from '../types';
import { MathUtils } from '../utils/MathUtils';

export class Location implements Coordinates {
    public longitude: number;
    public latitude: number;
    private _isInDegrees: boolean;

    constructor(lat: number, lon: number, isDegrees: boolean = true) {
        this._isInDegrees = isDegrees;

        if (lat < -90 || lat > 90) {
            throw new Error('Location latitude cant be more than 90 and less than 0 degrees');
        }

        if (lon > 180 || lon < -180) {
            throw new Error('Location longitude cant be more than 180 and less than 0 degrees');
        }

        this.latitude = lat;
        this.longitude = lon;
    }

    get isInDegrees(): boolean {
        return this._isInDegrees;
    }

    get hash(): string {
        return `${this.latitude}${this.longitude}`;
    }

    toRadians(): Location {
        if (this._isInDegrees) {
            return new Location(
                MathUtils.degreesToRadians(this.latitude),
                MathUtils.degreesToRadians(this.longitude),
                false,
            );
        }

        return this;
    }

    toDegrees() {
        if (!this._isInDegrees) {
            return new Location(
                MathUtils.radiansToDegrees(this.latitude),
                MathUtils.radiansToDegrees(this.longitude)
            );
        }

        return this;
    }
}
