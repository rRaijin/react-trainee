import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {articles} from "../actions";


class Home extends Component {

    componentDidMount() {
        if (!this.props.articles || this.props.articles.length === 0) {
            this.props.fetchAllArticles()
        }
    };

    render() {
        return (
            <div>

                <Link to='/notes'>Notes</Link>

                <h2>All articles</h2>
                <hr />
                <table>
                    <tbody>
                        {this.props.articles.map((article, id) => (
                            <tr key={`article_${id}`}>
                                <td>{article.headline}</td>
                                <td>{article.description}</td>
                                <td>{article.created}</td>
                                <td>{article.author.username}</td>
                                <td>{article.image}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
