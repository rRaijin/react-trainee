import React, { Component } from 'react';
import {Link} from "react-router-dom";


export default class Article extends Component {

    state = {
    headline: "",
        description: "",
        image: null,
    updateArticleId: null,
  };

    render() {
        console.log('article props', this.props);
        return (
            <div className="article-container">
                <h3 className="article-headline">{this.props.article.headline}</h3>
                {
                    this.props.article.img_name &&
                    <img src={require('../../images/articles/' + this.props.article.img_name)} alt=""/>
                }
                {/*тоже пока костыль нид через ферст оф тайп взять*/}
                <p className="article-description">{this.props.article.description}</p>
                <p>
                    <span>Published at {this.props.article.created}</span>
                </p>
                <p onClick={this.props.deleteArticle(this.props.article.id)}>del</p>
                <Link to={{ pathname: '/articles/' + this.props.article.id}}>more >></Link>
            </div>
        )
    }
}
