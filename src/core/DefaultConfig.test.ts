import Config from './DefaultConfig';

describe('testing default config values', () => {
   it('should have correct max distance', () => {
       expect(Config.MAX_DISTANCE).toBe(100);
   });

   it('should have correct target location', () => {
       expect(Config.TARGET_LOCATION.latitude).toBe(53.339428);
       expect(Config.TARGET_LOCATION.longitude).toBe(-6.257664);
   });
});
