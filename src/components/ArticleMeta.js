import React from "react";
import { Link } from "react-router-dom";
import { parseTime } from "../utils";
import Avatar from "./Avatar";
export default (props) => {
  const article = props.article,
    user = article.author;
  return (
    <div className="article-meta">
      <Avatar user={user} />
      <div className="info">
        <Link className="author" to={`@${user.username}`}>
          {user.username}
        </Link>
        <span className="date">{parseTime(new Date(article.updatedAt))}</span>
      </div>
      {props.children}
    </div>
  );
};
