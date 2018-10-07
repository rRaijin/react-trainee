import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {users} from "../actions";


class ProfilePage extends Component {

    state = {
        text: "",
        attr: "",
        username: this.props.user.username,
        first_name: this.props.user.first_name,
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
        // console.log(this.props.user);
        return (
            <div>
                <div>

                    <Link to='/'>Home</Link>
                    <Link to='/notes'>Notes</Link>

                    <h3>{this.state.username}</h3>
                    <form onSubmit={this.submitNewValueForUserAttr}>
                      <input
                        value={this.state.text}
                        onChange={(e) => this.setState({text: e.target.value})}
                        required />
                      <input type="submit" value="Save Name" />
                    </form>
                </div>
                <div>
                    <p>{this.state.username}</p>
                    <button onClick={() => this.selectForEdit(this.state.username, 'username')}>
                        edit username
                    </button>
                </div>
                <div>
                    <p>{this.state.first_name}</p>
                    <button onClick={() => this.selectForEdit(this.state.first_name, 'first_name')}>
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
