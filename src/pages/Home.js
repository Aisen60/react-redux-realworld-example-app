import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { YOUR_FEED, GLOBAL_FEED } from "../constants/confog";
import {
  GET_ALL_TAGS,
  GET_HOME_ARTICLE_LIST,
  CHANGE_HOME_TAB,
} from "../constants/actionTypes";
import { getToken } from "../utils";
import ArticlesList from "../components/ArticlesList";
import Pagination from "../components/Pagination";
import TagList from "../components/TagList";

const Feed = (props) => {
  return (
    <li className="nav-item">
      <Link
        to="/"
        className={props.tab === props.name ? "nav-link active" : "nav-link "}
        onClick={() => {
          props.handleChangeTab(props.that, props.name);
        }}
      >
        {props.name}
      </Link>
    </li>
  );
};

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.handlePageChange = (page) => {
      if (this.props.tab === YOUR_FEED) {
        this.props.getYourFeed(page);
      }
      if (this.props.tab === GLOBAL_FEED) {
        this.props.getGlobalFeed(page);
      }
    };
  }
  render() {
    return (
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {getToken() && (
                    <Feed
                      name={YOUR_FEED}
                      tab={this.props.tab}
                      that={this}
                      handleChangeTab={this.props.handleChangeTab}
                    ></Feed>
                  )}
                  <Feed
                    name={GLOBAL_FEED}
                    tab={this.props.tab}
                    that={this}
                    handleChangeTab={this.props.handleChangeTab}
                  ></Feed>
                </ul>

                <ArticlesList list={this.props.list} />

                {this.props.count > 0 && (
                  <Pagination
                    page={this.props.page}
                    total={this.props.count}
                    pagination={this.handlePageChange}
                  />
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <TagList tagList={this.props.tags}></TagList>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.getTagsList();
    // if (getToken()) {
    if (this.props.tab === YOUR_FEED) {
      this.props.getYourFeed(1);
    } else {
      this.props.getGlobalFeed(1);
    }
  }
}

const mapStateToProps = (state) => {
  // return {
  //   userInfo: state.userInfo,
  //   tags: state.tags,
  //   tab: state.tab,
  //   offset: state.offset,
  //   limit: state.limit,
  //   articleList: state.article,
  //   articlesCount: state.articlesCount,
  // };

  return {
    tags: state.home.tags,
    tab: state.home.tab,
    list: state.home.list,
    page: state.home.page,
    count: state.home.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * 获取所有tags
     */
    getTagsList: () => {
      dispatch({ type: GET_ALL_TAGS });
    },

    /**
     * 获取你关注用户的文章列表
     */
    getYourFeed: (page) => {
      dispatch({
        type: GET_HOME_ARTICLE_LIST,
        payload: { tab: YOUR_FEED, page },
      });
    },

    /**
     * 获取所有的文章列表
     */
    getGlobalFeed: (page) => {
      dispatch({
        type: GET_HOME_ARTICLE_LIST,
        payload: { tab: GLOBAL_FEED, page },
      });
    },

    /**
     * 处理切换tab
     */
    handleChangeTab: (that, newValue) => {
      if (that.props.tab === newValue) return;
      dispatch({ type: CHANGE_HOME_TAB, payload: { tab: newValue } });
      if (newValue === YOUR_FEED) {
        that.props.getYourFeed(1);
      }
      if (newValue === GLOBAL_FEED) {
        that.props.getGlobalFeed(1);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
