import React, { Component } from 'react';



export default class Article extends Component {

    render() {
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
