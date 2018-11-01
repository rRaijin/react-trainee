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
    };

    onSubmit = () => {
        this.props.login(this.state.username, this.state.password);
    };

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.login(this.state.username, this.state.password);
        }
    };

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state);
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
            <div onKeyPress={(e) => this._handleKeyPress(e)}>
                <Paper style={style}>
                    <form>
                        <fieldset>
                            <legend>Login Form</legend>
                            {
                                this.props.errors.length > 0 && this.props.errors[0].field !== 'detail' && (
                                    <ul style={{ listStyle: 'none' }}>
                                        {
                                            this.props.errors.map(error => (
                                                <li key={error.field} style={{ color: 'red' }}>{error.message}</li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
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
