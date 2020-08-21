import React from "react";
import { Link } from "react-router-dom";

export default (props) => {
  const className = props.className ? props.className : "";
  return (
    <Link className={"tag-default tag-pill " + className} to="/">
      {props.name}
    </Link>
  );
};
