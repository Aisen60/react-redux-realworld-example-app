import React from "react";
import Tag from "./Tag";

const TagList = (props) => {

  // className="tag-outline"
  if (props.tagList.length > 0) {
    const tagClassName = props.tagClassName;
    return (
      <ul className="tag-list">
        {props.tagList.map((item, index) => {
          return (
            <li key={index}>
              <Tag tagClassName={tagClassName} name={item}></Tag>
            </li>
          );
        })}
      </ul>
    );
  }
  return null;
};

export default TagList;
