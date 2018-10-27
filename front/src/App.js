import React, { Component } from 'react';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RootContainer from "./components/RootContainer";
import romaApp from "./reducers";


let store = createStore(romaApp, applyMiddleware(thunk));


export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div className="container">
                    <div className="header">
                        header
                    </div>
                    <div className="main-content">
                        <Provider store={store}>
                            <RootContainer />
                        </Provider>
                    </div>
                    <div className="footer">
                        footer
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
};
