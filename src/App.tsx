import * as React from 'react';
import './App.css';
import { DrinksAction } from './core/actions/DrinksAction';
import Config from './core/DefaultConfig';
import { Customer } from './core/models/Customer';
import CustomersList from './components/CustomersList';
import CustomersMap from './components/CustomersMap';
import ErrorMessage from './components/ErrorMessage';
import CustomersDrinksForm, { DrinksFormData } from './forms/CustomersDrinksForm';

interface State {
    error?: Error;
    customers: Array<Customer>;
    action: DrinksAction;
}

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            customers: [],
            action: new DrinksAction(Config)
        };
    }

    handleSubmit(data: DrinksFormData) {
        if (data.distance) {
            this.state.action.config = {
                ...this.state.action.config,
                MAX_DISTANCE: data.distance
            };
        }

        try {
            const customers = data.input
                ? this.state.action.process(data.input)
                : this.state.action.recalculate();

            this.setState({ customers, error: undefined });
        } catch (e) {
            this.setState({ error: e });
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App--map">
                    <CustomersMap
                        defaultCenter={Config.TARGET_LOCATION}
                        customers={this.state.customers}
                    />
                </div>
                <div className="App--main">
                    <div className="row">
                        <div className="App--logo" />
                        <h1>Call to a drink!</h1>
                        <ErrorMessage error={this.state.error} />
                        <CustomersDrinksForm
                            defaultDistance={Config.MAX_DISTANCE}
                            onSubmit={(data: DrinksFormData) => this.handleSubmit(data)}
                        />
                    </div>
                    <CustomersList customers={this.state.customers}/>
                </div>
            </div>
        );
    }
}

export default App;
