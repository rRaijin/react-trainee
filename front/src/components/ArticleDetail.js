import React, { Component } from 'react';
import {connect} from "react-redux";

import {articles} from "../actions";


class ArticleDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articleId: props.match.params.id,
        };
    }

    componentDidMount() {
        this.props.articleDetail(this.state.articleId)
        // this.props.articleDetail(1)
    }

    // componentWillMount() {
    //     // this.props.articleDetail(this.state.articleId)
    //     this.props.articleDetail(1)
    // }

    render() {
        console.log('state', this.state);
        console.log('props', this.props);
        return (
            <div className="article-container">
                <h3 className="article-headline">{this.props.article.headline}</h3>
                {
                    this.props.article.img_name &&
                    <img src={require('../images/articles/' + this.props.article.img_name)} alt=""/>
                }
                {/*тоже пока костыль нид через ферст оф тайп взять*/}
                <p className="article-description">{this.props.article.description}</p>
                <p>
                    <span>Published at {this.props.article.created} by </span>
                    {/*TODO костыль, нужно зять у последнего спана первую букву, через ферст леттер пока не пошло*/}
                    <span className="username">{this.props.article.author.username}</span>
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // articles: state.articles,
        article: state.article,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        articleDetail: (id) => {
            // dispatch(articles.articleDetail(id)).then((res) => {console.log(res)});
            dispatch(articles.articleDetail(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
