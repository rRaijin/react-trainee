import React, { Component } from 'react';
import {connect} from 'react-redux';

import {users} from "../actions";


class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            attr: "",
            user: this.props.user,
            username: this.props.user.username,
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
            birth_date: this.props.user.birth_date,
        };
    }

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
            <div className="row profile-info">
                <div className="col-lg-2">
                    {
                        this.state.user.avatar_name &&
                        <img src={require('../images/avatars/' + this.state.user.avatar_name)} alt=""/>
                    }
                </div>
                <div className="col-lg-4">
                    <h3>
                        {this.state.username}
                        [
                            <span onClick={() => this.selectForEdit(this.state.user.username, 'username')}>E</span>
                        ]
                    </h3>
                    <p>
                        {this.state.first_name}
                        [
                            <span onClick={() => this.selectForEdit(this.state.user.first_name, 'first_name')}>E</span>
                        ]
                        [X]
                    </p>
                    <p>
                        {this.state.last_name}
                        [
                            <span onClick={() => this.selectForEdit(this.state.user.last_name, 'last_name')}>E</span>
                        ]
                        [X]
                    </p>
                    <p>
                        {this.state.birth_date}
                        [
                            <span onClick={() => this.selectForEdit(this.state.user.birth_date, 'birth_date')}>E</span>
                        ]
                        [X]
                    </p>
                    <p>{this.state.user.joined}</p>
                    <form onSubmit={this.submitNewValueForUserAttr}>
                      <input
                        value={this.state.text}
                        onChange={(e) => this.setState({text: e.target.value})}
                        required />
                      <input type="submit" value="Save" />
                    </form>
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
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
