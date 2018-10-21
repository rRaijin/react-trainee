import React, { Component } from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {articles} from "../actions";


class ArticleDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articleId: props.match.params.id,
            article: {}
        };
    }

    componentDidMount() {
        this.props.articleDetail(this.state.articleId).then(
            (res) => {
                this.setState({ article: res.article },
                () => { console.log(this.state.article); });
            }
        )
    }

    render() {
        return (
            <div className="article-container">
                {
                    this.state.article.img_name &&
                    <img src={require('../images/articles/' + this.state.article.img_name)} alt=""/>
                }
                <h3 className="article-headline">{this.state.article.headline}</h3>
                {/*тоже пока костыль нид через ферст оф тайп взять*/}
                <p className="article-description">{this.state.article.description}</p>
                <p>
                    <span>Published at {this.state.article.created} by </span>
                    {
                        this.state.article.author &&
                        <Link to={{ pathname: '/users/' + this.state.article.author.id + '/author' }}>
                            <span className="username">
                                {this.state.article.author.username}
                            </span>
                        </Link>
                    }
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        article: state.articles,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        articleDetail: (id) => {
            return dispatch(articles.articleDetail(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
