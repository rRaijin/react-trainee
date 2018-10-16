import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";
import {Paper, RaisedButton, TextField} from "material-ui";

import {auth} from "../actions";


const style = {
    marginTop: 50,
    marginLeft: '25%',
    paddingBottom: 50,
    paddingTop: 25,
    width: '50%',
    textAlign: 'center',
    display: 'inline-block',
};


class Login extends Component {

  state = {
    username: "",
    password: "",
    username_error_text: null,
    password_error_text: null,
    disabled: true,
  };

  onSubmit = () => {
      this.props.login(this.state.username, this.state.password);
  };

  validateUsername = username => {
    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const re = /^/;
    return re.test(username);
  };

  isDisabled() {
    let username_is_valid = false;
    let password_is_valid = false;

    if (this.state.username === '') {
        this.setState({
            username_error_text: null,
        });
    } else if (this.validateUsername(this.state.username)) {
        username_is_valid = true;
        this.setState({
            username_error_text: null,
        });

    } else {
        this.setState({
            username_error_text: 'Sorry, this is not a valid username',
        });
    }

    if (this.state.password === '' || !this.state.password) {
        this.setState({
            password_error_text: null,
        });
    } else if (this.state.password.length >= 6) {
        password_is_valid = true;
        this.setState({
            password_error_text: null,
        });
    } else {
        this.setState({
            password_error_text: 'Your password must be at least 6 characters',
        });

    }

    if (username_is_valid && password_is_valid) {
        this.setState({
            disabled: false,
        });
    }
  };

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
        if (!this.state.disabled) {
            this.props.login(this.state.username, this.state.password);
        }
    }
  };

  changeValue(e, type) {
    const value = e.target.value;
    const next_state = {};
    next_state[type] = value;
    this.setState(next_state, () => {
        this.isDisabled();
    });
  };

  render() {
    if (this.props.isAuthenticated) {
       return <Redirect to="/" />
    }
    // console.log(this.props.errors);
    return (
        <div onKeyPress={(e) => this._handleKeyPress(e)}>
            <Paper style={style}>
                <form>
                    <fieldset>
                        <legend>Login Form</legend>
                        {/*TODO обработать ошибки*/}
                        
                        {/*{this.props.errors.length > 0 && (*/}
                            {/*<ul>*/}
                                {/*{this.props.errors.map(error => (*/}
                                    {/*<li key={error.field}>{error.message}</li>*/}
                                {/*))}*/}
                            {/*</ul>*/}
                        {/*)}*/}
                        <div className="col-md-12">
                            <TextField
                                hintText="Username"
                                floatingLabelText="Username"
                                type="username"
                                errorText={this.state.username_error_text}
                                onChange={(e) => this.changeValue(e, 'username')}
                            />
                        </div>
                        <div className="col-md-12">
                            <TextField
                                hintText="Password"
                                floatingLabelText="Password"
                                type="password"
                                errorText={this.state.password_error_text}
                                onChange={(e) => this.changeValue(e, 'password')}
                            />
                        </div>
                        <RaisedButton
                            disabled={this.state.disabled}
                            style={{ marginTop: 50 }}
                            label="Submit"
                            onClick={this.onSubmit}
                        />
                        <p>
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </fieldset>
                </form>
            </Paper>
        </div>
    )
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(auth.login(username, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
