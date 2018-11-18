import React, { Component } from 'react';
import { connect } from 'react-redux';

import { articles } from "../actions";
import ArticlePreview from "./article/ArticlePreview";
import CreateArticleDialog from "./CreateArticleDialog";
import Pagination from "./Pagination";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            pageOfItems: [],
            articles: []
        };
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        this.props.fetchAllArticles().then((res) => this.setState({
            articles: res.articles
        }))
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.articles.length !== nextProps.articles.length) {
            this.setState({
                articles: nextProps.articles
            })
        }
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-8">
                    {this.state.pageOfItems.map((article, id) => (
                        <ArticlePreview article={ article } key={ id } />
                    ))}
                    <Pagination items={ this.state.articles } onChangePage={ this.onChangePage } />
                </div>
                <div className="col-lg-4">
                    <CreateArticleDialog add_article={ this.props.addArticle }
                                         is_auth={ this.props.auth.user }
                                         btn_name='Create article'
                    />
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
