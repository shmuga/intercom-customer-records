export type CacheObject<K, T> = Map<K, T>;

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface AppConfig {
    TARGET_LOCATION: Coordinates;
    MAX_DISTANCE: number;
}

export interface Action<T, K> {
    process(data: T): K;
}
