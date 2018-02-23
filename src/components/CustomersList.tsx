import * as React from 'react';
import { Customer } from '../core/models/Customer';
import './CustomersList.css';

export interface CustomersListProps {
    customers: Array<Customer>;
}

class CustomersList extends React.Component<CustomersListProps, {}> {
    render() {
        if (this.props.customers.length === 0) {
            return null;
        }

        return (
            <div className="CustomersList">
                <label>Customers to invite</label>
                {this.props.customers.map(customer =>
                    <div key={customer.userId}>{customer.userId} {customer.name}</div>)
                }
            </div>
        );
    }
}

export default CustomersList;
