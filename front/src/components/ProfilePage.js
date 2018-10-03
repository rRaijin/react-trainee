import React, { Component } from 'react';
import {connect} from 'react-redux';
import {users} from "../actions";


class ProfilePage extends Component {

    state = {
        text: ""
    };

    submitName = (e) => {
        e.preventDefault();
        this.props.updateName(this.props.user.id, this.state.text).then(this.resetForm);
        this.setState({text: ""});
    };

    render() {
        return (
            <div>
                <div>
                    <h3>{this.props.user.username}</h3>
                    <span>Edit name</span>
                    <form onSubmit={this.submitName}>
                      <input
                        value={this.state.text}
                        placeholder="Enter note here..."
                        onChange={(e) => this.setState({text: e.target.value})}
                        required />
                      <input type="submit" value="Save Name" />
                    </form>
                </div>
                <p>{this.props.user.id}</p>
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
    updateName: (id, newname) => {
      return dispatch(users.updateName(id, newname));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
