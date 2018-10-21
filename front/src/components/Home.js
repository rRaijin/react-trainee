import React, { Component } from 'react';
import {connect} from 'react-redux';

import {articles} from "../actions";
import ArticlePreview from "./ArticlePreview";

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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
