import Config from '../DefaultConfig';
import { DrinksAction } from './DrinksAction';
import { Customer } from '../models/Customer';

it('should test negative cases for validator', () => {
    const app = new DrinksAction(Config);

    const negativeCases = [
        '',
        '{}',
        '{ "userId": "123" }',
        '{ "user_id": "123" }',
        '{ "user_id": 123, }',
        '{ "user_id": 123, "name": 123 }',
        '{ "user_id": 123, "name": "123" }',
        '{ "user_id": 123, "name": "123", "latitude": "131" }',
        '{ "user_id": 123, "name": "123", "latitude": "131", "longitude": "123", }'
    ];

    negativeCases.forEach(testCase => {
        expect(() => app.validate(testCase)).toThrowError();
    });
});

it('should test valid data for validator', () => {
    const app = new DrinksAction(Config);

    const valid = '{ "user_id": 123, "name": "123", "latitude": "131", "longitude": "123"}';

    expect(() => app.validate(valid)).not.toThrow();
});

it('should test transform function', () => {
    const data: Array<any> = [{
        user_id: 123,
        name: 'foobar',
        latitude: 50.12,
        longitude: 12.5,
    }];

    const app = new DrinksAction(Config);

    const res = app.transform(data);
    expect(res).toBeInstanceOf(Array);
    res.forEach(customer => expect(customer).toBeInstanceOf(Customer));
});

it('should work without any payload', () => {
    const app = new DrinksAction(Config);

    expect(app.process()).toEqual([]);
    expect(app.recalculate()).toEqual([]);
});

it('should correct work with normal data', () => {
    const input = '{"latitude": "53.1302756", "user_id": 1, "name": "User1", "longitude": "-6.2397222"}';

    const app = new DrinksAction(Config);

    expect(app.process(input).length).toEqual(1);

    app.config = { ...Config, MAX_DISTANCE: 20 };

    expect(app.recalculate().length).toEqual(0);
});
