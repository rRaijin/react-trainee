import React, { Component } from 'react';
import {connect} from 'react-redux';

import {articles} from "../actions";
import ArticlePreview from "./article/ArticlePreview";
import CreateArticleDialog from "./CreateArticleDialog";
import Pagination from "./Pagination";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            pageOfItems: []
        };
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount() {
        if (!this.props.articles || this.props.articles.length === 0) {
            this.props.fetchAllArticles()
        }
    };

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-8">
                    {this.state.pageOfItems.map((article, id) => (
                        <ArticlePreview article={article} key={id} />
                    ))}
                    <Pagination items={this.props.articles} onChangePage={this.onChangePage} />
                </div>
                <div className="col-lg-4">
                    <CreateArticleDialog add_article={this.props.addArticle} is_auth={this.props.auth.user} />
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        articles: state.articles,
        auth: state.auth,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllArticles: () => {
            return dispatch(articles.fetchAllArticles());
        },
        addArticle: (headline, description, image) => {
            return dispatch(articles.addArticle(headline, description, image));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
