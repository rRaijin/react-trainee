import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Redirect, Link} from 'react-router-dom';

import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";

import romaApp from "./reducers";
import {auth} from "./actions";

import Login from "./components/Login";
import Note from "./components/Note";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import ProfilePage from "./components/ProfilePage";


let store = createStore(romaApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

  componentDidMount() {
    this.props.loadUser();
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  };

  render() {
    let {PrivateRoute} = this;
    // console.log('props', this.props.auth.user.username);
    return (
      <BrowserRouter>
        <div>
        <Link to='/profile'>

            {/*TODO user in here is undefined */}

            {/*{this.props.auth.user.username}*/}

            Profile
        </Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/notes" component={Note} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  }
};

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);


export default class App extends Component {
  render() {
    return (
      <div>
        <div style={{textAlign: "center"}}>
            some here...
        </div>
        <Provider store={store}>
          <RootContainer />
        </Provider>
      </div>
    )
  }
};
