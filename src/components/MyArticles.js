import React from "react";
import ArticlesList from "./ArticlesList";
import { connect } from "react-redux";
import { changeHomeTab } from "../store/actionCreators";

export const MyArticles = (props) => {
  return (
    <>
      <ArticlesList />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tab: state.tab,
    offset: state.offset,
    limit: state.limit,
    articleList: state.article,
    articlesCount: state.articlesCount,
  };
};

const mapDisPatchToProps = (dispatch) => {
  return {
    handleArticlesToggle: () => {
      const action = changeHomeTab("My Articles");
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(MyArticles);
