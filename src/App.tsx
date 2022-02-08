import React, { Component } from 'react';
import { render } from 'react-dom';

import Hello from './Hello';

interface AppProps { }
interface AppState {
    name: string;
}

class App extends Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = {
            name: 'React Typescript'
        };
    }

    render() {
        return (
            <div>
                <Hello name={this.state.name}></Hello>
                <p>Start editing to see some magic happen :)</p>
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));