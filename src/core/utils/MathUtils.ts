export class MathUtils {
    static degreesToRadians(coordinate: number): number {
        return coordinate * Math.PI / 180;
    }

    static radiansToDegrees(coordinate: number): number {
        return coordinate * 180 / Math.PI;
    }
}
