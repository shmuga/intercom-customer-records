import * as React from 'react';
import './ErrorMessage.css';
interface Props {
    error?: Error;
}

class ErrorMessage extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        if (!this.props.error) {
            return null;
        }

        return (
            <div className="Error">
                <div className="Error--header">Error occurred</div>
                <div className="Error--message">{this.props.error.message}</div>
            </div>
        );
    }
}

export default ErrorMessage;
