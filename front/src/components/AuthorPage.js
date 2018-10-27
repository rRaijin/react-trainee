import React, { Component } from 'react';
import {connect} from 'react-redux';

import Article from "./article/Article";
import {users} from "../actions";


class AuthorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: props.match.params.id,
            author: {}
        };
    }

    componentDidMount() {
        this.props.fetchUser(this.state.userId).then(
            (res) => {
                this.setState({author: res.user})
            }
        )
    }

    render() {
        return (
            <div className="row profile-info">
                <div className="col-lg-2">
                    {
                        this.state.author.avatar_name &&
                        <img src={require('../images/avatars/' + this.state.author.avatar_name)}
                             alt=""/>
                    }
                </div>
                <div className="col-lg-4">
                    <h3>{this.state.author.username}</h3>
                    <p>{this.state.author.first_name}</p>
                    <p>{this.state.author.last_name}</p>
                    <p>{this.state.author.birth_date}</p>
                    <p>{this.state.author.joined}</p>
                    <div>
                        {
                            this.state.author.articles &&
                            this.state.author.articles.map((article, id) => (
                                <Article article={article} key={id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    };
}

const mapStateToProps = state => {
    return {
        user: state.users,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: (id) => {
            return dispatch(users.fetchUser(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
