import React, { Component } from 'react';
import {Link} from "react-router-dom";


export default class ArticlePreview extends Component {

    truncate_description = () => {
       if (this.props.article.description.length > 100)
          return this.props.article.description.substring(0,100)+'...';
       else
          return this.props.article.description;
    };

    render() {
        return (
            <div className="article-container">
                <h3 className="article-headline">{this.props.article.headline}</h3>

                {/*TODO trouble : refresh page if add image in article > async action?*/}
                {
                    this.props.article.img_name &&
                    <img src={require('../../images/articles/' + this.props.article.img_name)}
                         alt=""/>
                }

                {/*тоже пока костыль нид через ферст оф тайп взять*/}
                <p className="article-description">{this.truncate_description()}</p>
                <p>
                    <span>Published at {this.props.article.created} by </span>
                    <Link to={{ pathname: 'users/' + this.props.article.author.id + '/author' }}>
                        {/*TODO костыль, нужно зять у последнего спана первую букву, через ферст леттер пока не пошло*/}
                        <span className="username">{this.props.article.author.username}</span>
                    </Link>
                </p>
                <Link to={{ pathname: 'articles/' + this.props.article.id}}>more >></Link>
            </div>
        )
    }
}
