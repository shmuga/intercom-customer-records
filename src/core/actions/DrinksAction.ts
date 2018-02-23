import { Customer } from '../models/Customer';
import { Location } from '../models/Location';
import { Cache } from '../classes/Cache';
import { GeoUtils } from '../utils/GeoUtils';
import { Action, AppConfig, CacheObject } from '../types';
import Config from '../DefaultConfig';

export class DrinksAction implements Action<string, Array<Customer>> {
    private _state?: Array<Customer>;
    private cache: CacheObject<string, number>;
    private _config: AppConfig;
    private targetLocation: Location;

    constructor(config: AppConfig = Config) {
        this._config = config;
        this.targetLocation = new Location(
          config.TARGET_LOCATION.latitude,
          config.TARGET_LOCATION.longitude
        );

        this.cache = Cache.getInstance();
    }

    get config(): AppConfig {
        return this._config;
    }

    set config(value: AppConfig) {
        this._config = value;
        this.cache.clear();
    }

    get state(): Array<Customer> {
        if (this._state && this._state.length > 0) {
            return this._state;
        }

        return [];
    }

    process(input?: string): Array<Customer> {
        if (!input || input.length === 0) {
            return [];
        }

        const validated: Array<any> = this.validate(input);
        this._state = this.transform(validated);

        return this.recalculate();
    }

    recalculate(): Array<Customer> {
        return this.filter().sort((c1, c2) => c1.userId - c2.userId);
    }

    validate(input: string): Array<any> {
        try {
            const arr: Array<string> = input.split('\n');
            const parsed: Array<any> = arr.map(
                (line: string) => JSON.parse(line)
            );

            parsed.forEach((line, key) => {
                if (!Number.isInteger(line.user_id)) {
                    throw new Error(`Incorrect user_id for key=${key}`);
                }

                if (Object.prototype.toString.call(line.name) !== '[object String]') {
                    throw new Error(`Incorrect name for key=${key}`);
                }

                if (!line.latitude || isNaN(line.latitude)) {
                    throw new Error(`Incorrect latitude in key=${key}`);
                }

                if (!line.longitude || isNaN(line.longitude)) {
                    throw new Error(`Incorrect longitude in key=${key}`);
                }
            });

            return parsed;
        } catch (e) {
            if (e instanceof SyntaxError) {
                throw new Error('Invalid data provided. Please check input.');
            }
            throw e;
        }
    }

    transform(data: Array<any>): Array<Customer> {
        return data.map(line => {
            return new Customer(
                <number> line.user_id,
                <string> line.name,
                new Location(
                    parseFloat(line.latitude),
                    parseFloat(line.longitude)
                ),
            );
        });
    }

    filter() {
        if (!this._state) {
            return [];
        }
        return this._state.filter(customer => {
            const hash = `${customer.location.hash}${this.targetLocation.hash}`;

            const cachedDistance = this.cache.get(hash);
            const distance = cachedDistance
                || GeoUtils.calculateOrthodromicDistance(
                    customer.location.toRadians(),
                    this.targetLocation.toRadians()
                );

            if (distance !== cachedDistance) {
                this.cache.set(hash, distance);
            }

            return distance <= this.config.MAX_DISTANCE;
        });
    }
}
