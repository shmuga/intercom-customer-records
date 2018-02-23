import { MathUtils } from './MathUtils';

describe('general test for math utils', () => {
    it('should test degrees to radians', () => {
        for (var i = 0; i++; i < 360) {
            expect(MathUtils.degreesToRadians(360 / i)).toBe(2 * Math.PI / i);
        }
    });

    it('should test radians to degrees', () => {
        for (var i = 0; i++; i < 360) {
            expect(MathUtils.radiansToDegrees(2 * Math.PI / i)).toBe(360 / i);
        }
    });
});
