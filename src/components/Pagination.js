import React from "react";
import { Link } from "react-router-dom";

const PageItem = (props) => {
  return (
    <li className={props.active ? "page-item active" : "page-item"}>
      <Link
        to=""
        className="page-link"
        onClick={(e) => {
          props.pagination((props.num - 1) * props.limit);
        }}
      >
        {props.num}
      </Link>
    </li>
  );
};

export default (props) => {
  const pageNum = Math.ceil(props.total / props.limit); // 总页数
  const current = props.offset / props.limit; // 当前页数

  const PageItemView = () => {
    let vnode = [];
    for (let item = 0; item < pageNum; item++) {
      vnode.push(
        <PageItem
          pagination={props.pagination}
          key={item}
          num={item + 1}
          limit={props.limit}
          active={item === current}
        ></PageItem>
      );
    }
    return vnode;
  };

  return (
    <nav>
      <ul className="pagination">{PageItemView(props)}</ul>
    </nav>
  );
};
