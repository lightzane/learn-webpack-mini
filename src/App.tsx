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

    exampleClick(): void {
        alert('this.state.name = ' + this.state.name);
    }

    render() {
        return (
            <div>
                <Hello name={this.state.name}></Hello>
                <p>Start editing to see some magic happen :)</p>
                <button className='btn btn-primary' onClick={() => this.exampleClick()}>Button</button>
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));