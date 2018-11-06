import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import {users, self_articles} from "../actions";
import CreateArticleDialog from "./CreateArticleDialog";


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

    componentDidMount() {
        if (!this.props.articles || this.props.articles.length === 0) {
            this.props.fetchSelfArticles(this.props.user.id)
        }
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
            <div>
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
                <div className="row">
                    <p>articles:</p>
                    {this.props.articles.map((article, index) => (

                    <div className="article-container" key={`article_${article.id}`}>
                        <h3 className="article-headline">{article.headline}</h3>
                        {
                            article.img_name &&
                            <img src={require('../images/articles/' + article.img_name)} alt=""/>
                        }
                        <p className="article-description">{article.description}</p>
                        <p>
                            <span>Published at {article.created}</span>
                        </p>
                        <p onClick={() => {this.props.deleteArticle(index)}}>del</p>

                        {/*<p onClick={() => {this.props.updateArticle(index)}}>up</p>*/}

                        <CreateArticleDialog article="sadf"
                                             add_article={this.props.updateArticle}
                                             is_auth={this.props.user} />

                        <Link to={{ pathname: '/articles/' + article.id}}>more >></Link>
                    </div>
                    ))}
                </div>
            </div>
        )
    };
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    articles: state.self_articles,
  }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSelfArticles: (author_id) => {
            return dispatch(self_articles.fetchSelfArticles(author_id));
        },
        updateArticle: (id, headline, description, image) => {
            return dispatch(self_articles.updateSelfArticle(id, headline, description, image));
        },
        deleteArticle: (id) => {
            return dispatch(self_articles.deleteSelfArticle(id));
        },
        updateAttr: (id, attr, new_value) => {
            return dispatch(users.updateUserAttr(id, attr, new_value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
