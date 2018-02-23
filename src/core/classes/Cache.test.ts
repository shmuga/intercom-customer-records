import { Cache } from './Cache';
import { CacheObject } from '../types';

describe('general test for cache functions', () => {
    let cache: CacheObject<string, number> = Cache.getInstance();

    it('should test cache is create', () => {
        expect(cache).not.toBeNull();
    });

    it('should try to get empty value', () => {
        expect(cache.get('1')).toBeUndefined();
    });

    it('should try to set and get the value', () => {
        cache.set('1', 2);
        expect(cache.get('1')).toBe(2);
    });
});
