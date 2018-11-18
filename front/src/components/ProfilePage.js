import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { articles, users } from "../actions";
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
            articles: []
        };
    }

    componentWillMount() {
        this.props.fetchSelfArticles(this.props.user.id).then((res) => this.setState({
            articles: res.articles
        }))
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            articles: nextProps.articles
        })
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
        const self_articles = this.state.articles.filter(article => article.author.id === this.props.user.id);
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
                    { self_articles.map(article => (

                    <div className="article-container" key={ `article_${ article.id }` }>
                        <h3 className="article-headline">{ article.headline }</h3>
                        {
                            article.img_name &&
                            <img src={require('../images/articles/' + article.img_name)} alt=""/>
                        }
                        <p className="article-description">{ article.description }</p>
                        <p>
                            <span>Published at {article.created}</span>
                        </p>
                        <p onClick={() => {this.props.deleteArticle(article.id)}}>del</p>

                        <CreateArticleDialog article={ article }
                                             add_article={ this.props.updateArticle }
                                             is_auth={ this.props.user }
                                             btn_name='update article'
                        />

                        <Link to={{ pathname: '/articles/' + article.id }}>more >></Link>
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
    articles: state.articles,
  }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSelfArticles: (author_id) => {
            return dispatch(articles.fetchSelfArticles(author_id));
        },
        updateArticle: (headline, description, image, id) => {
            return dispatch(articles.updateSelfArticle(id, headline, description, image));
        },
        deleteArticle: (id) => {
            return dispatch(articles.deleteSelfArticle(id));
        },
        updateAttr: (id, attr, new_value) => {
            return dispatch(users.updateUserAttr(id, attr, new_value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
