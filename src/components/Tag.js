import React from "react";
import { Link } from "react-router-dom";

export default (props) => {
  const tagClassName = props.tagClassName ? props.tagClassName : "";
  return (
    <Link className={"tag-default tag-pill " + tagClassName} to="/">
      {props.name}
    </Link>
  );
};
