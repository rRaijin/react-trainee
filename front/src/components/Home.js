import React, { Component } from 'react';
import {connect} from 'react-redux';

import {articles} from "../actions";
import ArticlePreview from "./ArticlePreview";
import CreateArticleDialog from "./CreateArticleDialog";

class Home extends Component {

    componentDidMount() {
        if (!this.props.articles || this.props.articles.length === 0) {
            this.props.fetchAllArticles()
        }
    };

    render() {
        return (
            <div className="row">
                <div className="col-lg-8">
                    {this.props.articles.map((article, id) => (
                        <ArticlePreview article={article} key={id} />
                    ))}
                </div>
                <div className="col-lg-4">
                    <CreateArticleDialog add_article={this.props.addArticle} />
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        articles: state.articles,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllArticles: () => {
            dispatch(articles.fetchAllArticles());
        },
        addArticle: (headline, description) => {
            return dispatch(articles.addArticle(headline, description));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
