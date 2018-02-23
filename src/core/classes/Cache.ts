import { CacheObject } from '../types';

export class Cache {
    private static instance?: Map<any, any>;

    static getInstance<K, T>(): CacheObject<K, T> {
        if (!this.instance) {
            this.instance = new Map<K, T>();
        }

        return this.instance;
    }

    private constructor() {}
}
