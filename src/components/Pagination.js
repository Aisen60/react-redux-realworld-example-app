import React from "react";
import { Link } from "react-router-dom";

const PageItem = (props) => {
  return (
    <li className={props.active ? "page-item active" : "page-item"}>
      <Link
        to="/"
        className="page-link"
        onClick={(ev) => {
          ev.preventDefault();
          props.pagination(props.num);
        }}
      >
        {props.num}
      </Link>
    </li>
  );
};

export default (props) => {
  const limit = props.limit ? props.limit : 10;
  const pageNum = Math.ceil(props.total / limit); // 总页数
  const page = props.page; // 当前页数

  const PageItemView = () => {
    let vnode = [];
    for (let item = 1; item <= pageNum; item++) {
      vnode.push(
        <PageItem
          active={item === page}
          num={item}
          pagination={props.pagination}
          key={item + "-" + Math.round(new Date())}
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
