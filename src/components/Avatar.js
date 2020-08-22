import React from "react";
import { Link } from "react-router-dom";
export default (props) => {
  const className = props.className ? props.className : "";
  return (
    <Link to={`@${props.user.username}`} className={className}>
      <img src={props.user.image} alt="" />
    </Link>
  );
};
