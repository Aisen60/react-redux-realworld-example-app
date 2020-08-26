import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  changeAppNav,
  getUserInfo,
  getAllTag,
  getGlobalArticlesList,
  changeGlobalLimit,
} from "../store/actionCreators";
import ArticlesList from "../components/ArticlesList";
import Pagination from "../components/Pagination";
import TagList from "../components/TagList";

const Banner = () => {
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  );
};

const YourFeed = (props) => {
  if (props.toke) {
    return (
      <li className="nav-item">
        <Link
          to="/"
          className={props.tab === "Your" ? "nav-link active" : "nav-link "}
        >
          Your Feed
        </Link>
      </li>
    );
  }
  return null;
};

const GlobalFeed = (props) => {
  return (
    <li className="nav-item">
      <Link
        to="/"
        className={props.tab === "Global" ? "nav-link active" : "nav-link "}
      >
        Global Feed
      </Link>
    </li>
  );
};

const PaginationView = (props) => {
  const params = props.params;
  if (params.articlesCount > 0) {
    return (
      <Pagination
        offset={params.offset}
        limit={params.limit}
        total={params.articlesCount}
        pagination={props.handlePageChange}
      />
    );
  }
  return null;
};

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  render() {
    return (
      <div className="home-page">
        <Banner />
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <YourFeed
                    token={this.props.userInfo.token}
                    tab={this.props.tab}
                  />
                  <GlobalFeed tab={this.props.tab} />
                </ul>

                <ArticlesList list={this.props.articleList} />

                <PaginationView
                  params={{
                    offset: this.props.offset,
                    limit: this.props.limit,
                    articleList: this.props.articleList,
                    articlesCount: this.props.articlesCount,
                  }}
                  handlePageChange={this.handlePageChange}
                />
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
    this.props.changePageTab();
    this.props.getTagDispatch();
    this.props.getGlobalArticlesDispatch(this.props.offset, this.props.limit);
  }
  handlePageChange(offset) {
    this.props
      .pageChangeDispatch(offset)
      .then((_) => {
        this.props.getGlobalArticlesDispatch(
          this.props.offset,
          this.props.limit
        );
      })
      .catch((err) => {});
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    tags: state.tags,
    tab: state.tab,
    offset: state.offset,
    limit: state.limit,
    articleList: state.article,
    articlesCount: state.articlesCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePageTab: () => {
      const action = changeAppNav("Home");
      dispatch(action);
    },
    getTagDispatch: () => {
      const action = getAllTag();
      dispatch(action);
    },
    getGlobalArticlesDispatch: (offset, limit) => {
      const params = {
        offset,
        limit,
      };
      const action = getGlobalArticlesList(params);
      dispatch(action);
    },
    pageChangeDispatch: (offset) => {
      return new Promise((resolve, reject) => {
        try {
          const action = changeGlobalLimit(offset);
          dispatch(action);
          resolve();
        } catch (err) {
          reject();
        }
      });
    },
    getUserInfoDispatch: () => {
      const action = getUserInfo();
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
