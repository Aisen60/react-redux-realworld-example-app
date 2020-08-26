import React from "react";
import ArticlePreview from "./ArticlePreview";

const ArticlesList = (props) => {
  if (props.list.length > 0) {
    return (
      <div>
        {props.list.map((item, index) => {
          return <ArticlePreview article={item} key={item.title + index} />;
        })}
      </div>
    );
  }
  return null;
};

export default ArticlesList;
