import React from "react";
import { Link } from "react-router-dom";
export default (props) => {
  return (
    <Link to={`/user/${props.user.username}`}>
      <img src={props.user.image} alt="" />
    </Link>
  );
};
