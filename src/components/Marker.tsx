import * as React from 'react';
import './Marker.css';

interface MarkerProps {
    lat: number;
    lng: number;
    text: string;
    className: string;
}

class Marker extends React.Component<MarkerProps, {}> {
    constructor(props: MarkerProps) {
        super(props);
    }

    render() {
        return (
            <div className={`Marker ${this.props.className}`}>
                {this.props.text}
            </div>
        );
    }
}

export default Marker;
