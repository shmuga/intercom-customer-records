import { Location } from './Location';
import { Customer } from './Customer';

describe('general tests for Customer class', () => {
    it('should create instance of Customer', () => {
        const location = new Location(12, 5);
        const cutomer = new Customer(1, 'User', location);

        expect(cutomer).toBeInstanceOf(Customer);
    });
});
