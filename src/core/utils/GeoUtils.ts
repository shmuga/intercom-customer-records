import { Coordinates } from '../types';

export class GeoUtils {
    private static _EARTH_RADIUS = 6371; // kilometers

    static get EARTH_RADIUS(): number {
        return this._EARTH_RADIUS;
    }

    /**
     * This uses the ‘haversine’ formula to calculate the great-circle
     * distance between two points – that is, the shortest distance over
     * the earth’s surface – giving an ‘as-the-crow-flies’ distance between
     * the points (ignoring any hills they fly over, of course!).
     *
     * The haversine formula1 ‘remains particularly well-conditioned for
     * numerical computa­tion even at small distances’ – unlike calcula­tions
     * based on the spherical law of cosines.
     *
     * More information here: https://www.movable-type.co.uk/scripts/latlong.html
     */
    static calculateOrthodromicDistance(p1: Coordinates, p2: Coordinates): number {
        const fDiff = (p2.latitude - p1.latitude) / 2;
        const lDiff = (p2.longitude - p1.longitude) / 2;

        const a = Math.sin(fDiff) * Math.sin(fDiff)
            + Math.cos(p1.latitude) * Math.cos(p2.latitude)
            * Math.sin(lDiff) * Math.sin(lDiff);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = GeoUtils._EARTH_RADIUS * c;

        return parseFloat((distance).toFixed(2));
    }
}
