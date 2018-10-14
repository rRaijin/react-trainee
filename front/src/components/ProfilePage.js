import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {users} from "../actions";


class ProfilePage extends Component {

    state = {
        text: "",
        attr: "",
        user: this.props.user,
    };

    resetForm = name => {
        let display_attr = {};
        display_attr[this.state.attr] = name;
        this.setState({text: "", attr: ""});
        this.setState(display_attr);
    };

    selectForEdit = (value, attr) => {
        this.setState({text: value, attr: attr});
    };

    submitNewValueForUserAttr = (e) => {
        e.preventDefault();
        this.props.updateAttr(this.props.user.id, this.state.attr, this.state.text)
                  .then(() => this.resetForm(this.state.text));
    };

    render() {
        return (
            <div className="row">
                <div className="col-lg-6 profile-info">
                    {
                        this.state.user.avatar_name &&
                        <img src={require('../images/avatars/' + this.state.user.avatar_name)} alt=""/>
                    }
                    <h3>{this.state.user.username}</h3>
                    <p>{this.state.user.first_name}</p>
                    <p>{this.state.user.last_name}</p>
                    <p>{this.state.user.birth_date}</p>
                    <p>{this.state.user.joined}</p>
                    <form onSubmit={this.submitNewValueForUserAttr}>
                      <input
                        value={this.state.text}
                        onChange={(e) => this.setState({text: e.target.value})}
                        required />
                      <input type="submit" value="Save Name" />
                    </form>
                </div>
                <div>
                    <p>{this.state.user.username}</p>
                    <button onClick={() => this.selectForEdit(this.state.user.username, 'username')}>
                        edit username
                    </button>
                </div>
                <div>
                    <p>{this.state.user.first_name}</p>
                    <button onClick={() => this.selectForEdit(this.state.user.first_name, 'first_name')}>
                        edit first name
                    </button>
                </div>
            </div>
        )
    };
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateAttr: (id, attr, new_value) => {
      return dispatch(users.updateUserAttr(id, attr, new_value));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
