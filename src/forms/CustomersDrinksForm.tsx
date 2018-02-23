import * as React from 'react';
import customers from './default-customers';
import './CustomersDrinksForm.css';

export interface DrinksFormData {
    input?: string;
    distance?: number;
}

interface Props {
    defaultDistance: number;
    onSubmit(data: DrinksFormData): void;
}

interface State {
    input: string;
    distance: string;
}

class CustomersDrinksForm extends React.Component<Props, State> {
    private prevState: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            distance: props.defaultDistance.toString(),
            input: customers,
        };

        this.prevState = { distance: '', input: '' };
    }

    handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
        if (e) {
            e.preventDefault();
        }

        if (this.prevState.distance === this.state.distance
            && this.prevState.input === this.state.input
        ) {
            return;
        }

        this.props.onSubmit({
            input: this.prevState.input === this.state.input
                ? undefined
                : this.state.input,
            distance: this.prevState.distance === this.state.distance
            && this.state.distance.length
                ? undefined
                : parseFloat(this.state.distance)
        });

        this.prevState = this.state;
    }

    render() {
        return (
            <form
                className="CustomersDrinksForm"
                onSubmit={(e) => this.handleSubmit(e)}
            >
                <div className="row">
                    <label>Put customers data here</label>
                    <textarea
                        onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
                            this.setState({input: e.currentTarget.value});
                        }}
                    >
                        {this.state.input}
                    </textarea>
                </div>
                <div className="row">
                    <label>Type maximum distance from office</label>
                    <input
                        type="number"
                        min="1"
                        value={this.state.distance}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            this.setState({distance: e.currentTarget.value});
                        }}
                    />
                    <button
                        type="submit"
                        onSubmit={(e) => this.handleSubmit()}
                    >
                        Recalculate
                    </button>
                </div>
            </form>
        );
    }
}

export default CustomersDrinksForm;
