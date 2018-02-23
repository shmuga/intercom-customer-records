import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import { Coordinates } from '../core/types';

import { Customer } from '../core/models/Customer';
import Marker from './Marker';

export interface CustomersMapProps {
    defaultCenter: Coordinates;
    customers: Array<Customer>;
}

class CustomersMap extends React.Component<CustomersMapProps, {}> {
    render() {
        return (
            <GoogleMapReact
                defaultCenter={{
                    lat: this.props.defaultCenter.latitude,
                    lng: this.props.defaultCenter.longitude,
                }}
                defaultZoom={9}
            >
                <Marker
                    lat={this.props.defaultCenter.latitude}
                    lng={this.props.defaultCenter.longitude}
                    text="I"
                    className="Marker--intercom"
                />
                {
                    this.props.customers.map(customer =>
                        <Marker
                            key={customer.userId}
                            lat={customer.location.latitude}
                            lng={customer.location.longitude}
                            text={customer.userId.toString()}
                            className="Marker--customer"
                        />
                    )
                }
            </GoogleMapReact>
        );
    }
}

export default CustomersMap;
