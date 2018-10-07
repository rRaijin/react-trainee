import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {articles} from "../actions";


class Home extends Component {

    // баг, когда возвращаешься по стрелке на этй страницу, список удваивается
    state = {
        // articles: this.props.articles,
        // articles: [],
    };

    componentDidMount() {
        this.props.fetchAllArticles();
    };

    render() {
        console.log('props', this.props);
        console.log('state', this.state);
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
