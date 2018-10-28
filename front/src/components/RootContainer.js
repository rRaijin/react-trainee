import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect, Link } from 'react-router-dom';
import { connect } from "react-redux";

import ArticleDetail from "./article/ArticleDetail";
import AuthorPage from "./AuthorPage";
import {auth} from "../actions";
import Home from "./Home";
import Login from "./Login";
import Note from "./Note";
import NotFound from "./NotFound";
import ProfilePage from "./ProfilePage";
import Register from "./Register";


class RootContainer extends Component {

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
    // console.log(this.props.auth);
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/notes'>Notes</Link>
                    <Link to='/profile' hidden={!this.props.auth.isAuthenticated}>Profile</Link>
                    <Link to='/login' hidden={this.props.auth.isAuthenticated}>Login</Link>
                    <a onClick={this.props.logout} hidden={!this.props.auth.isAuthenticated}>(logout)</a>
                </nav>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route path="/articles/:id" component={ArticleDetail} />
                    <Route path="/users/:id/author" component={AuthorPage} />
                    <PrivateRoute exact path="/notes" component={Note} />
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
        },
        logout: () => dispatch(auth.logout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
