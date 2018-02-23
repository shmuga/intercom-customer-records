import { GeoUtils } from './GeoUtils';
import { MathUtils } from './MathUtils';

describe('GeoUtils.calculateOrthodromicDistance tests', () => {
    const testCases = [
        {
            p1: {latitude: 50.360167, longitude: 30.116167},
            p2: {latitude: 48.434000, longitude: 2.227667},
            distance: 2017.55
        },
        {
            p1: {latitude: 40.38, longitude: 73.46},
            p2: {latitude: 50.360167, longitude: 30.116167},
            distance: 3506.58,
        },
        {
            p1: {latitude: 0, longitude: 0},
            p2: {latitude: 0, longitude: 0},
            distance: 0,
        },
        {
            p1: {latitude: 90, longitude: 90},
            p2: {latitude: 0, longitude: 0},
            distance: 10007.54,
        },
        {
            p1: {latitude: 1, longitude: 1},
            p2: {latitude: 0, longitude: 0},
            distance: 157.25,
        }
    ];

    testCases.map(testCase => ({
        p1: {
            latitude: MathUtils.degreesToRadians(testCase.p1.latitude),
            longitude: MathUtils.degreesToRadians(testCase.p1.longitude),
        },
        p2: {
            latitude: MathUtils.degreesToRadians(testCase.p2.latitude),
            longitude: MathUtils.degreesToRadians(testCase.p2.longitude),
        },
        distance: testCase.distance,
    })).forEach((testCase, index) => {
        it(`should be correct distance for test case ${index} `, () => {
            expect(GeoUtils.calculateOrthodromicDistance(
                testCase.p1,
                testCase.p2
            )).toBe(testCase.distance);
        });
    });
});
