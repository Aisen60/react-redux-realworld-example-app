import React from "react";
// import Avatar from "./Avatar";
import ArticleMeta from "./ArticleMeta";
import { Link } from "react-router-dom";
import Tag from "./Tag";

const TagList = (props) => {
  if (props.tagList.length > 0) {
    return (
      <ul className="tag-list">
        {props.tagList.map((item, index) => {
          return (
            <li key={index}>
              <Tag className="tag-outline" name={item}></Tag>
            </li>
          );
        })}
      </ul>
    );
  }
  return null;
};
export default (props) => {
  const article = props.article;
  return (
    <div className="article-preview">
      <ArticleMeta article={article}>
        <div className="pull-xs-right">
          <button
            className={
              article.favorited
                ? "btn btn-sm btn-primary"
                : "btn btn-sm btn-outline-primary"
            }
          >
            <i className="ion-heart"></i>
            {article.favoritesCount}
          </button>
        </div>
      </ArticleMeta>

      <Link className="preview-link" to={`#/article/${article.slug}`}>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <TagList tagList={article.tagList}></TagList>
      </Link>
    </div>
  );
};
