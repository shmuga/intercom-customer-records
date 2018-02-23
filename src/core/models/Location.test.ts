import { Location } from './Location';

describe('general test for Location class', () => {
    it('should create Location instance', () => {
        const loc = new Location(90, 0);
        expect(loc).toBeInstanceOf(Location);
    });

    it('should convert Location to radians', () => {
        const loc = new Location(0, 180);
        const newLoc = loc.toRadians();

        expect(loc).not.toBe(newLoc);
        expect(newLoc.latitude).toBe(0);
        expect(newLoc.longitude).toBe(Math.PI);

        expect(newLoc.toRadians()).toBe(newLoc);
    });

});
