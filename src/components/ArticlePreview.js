import React from "react";
import { Link } from "react-router-dom";
import ArticleMeta from "./ArticleMeta";
import TagList from "../components/TagList";

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

      <Link className="preview-link" to={`/article/${article.slug}`}>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <TagList tagList={article.tagList} tagClassName="tag-outline"></TagList>
      </Link>
    </div>
  );
};
