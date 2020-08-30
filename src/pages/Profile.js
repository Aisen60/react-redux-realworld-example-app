import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  GET_USER_PROFILE,
  GET_PROFILE_ARTICLE,
  GET_PROFILE_FAVORITED,
} from "../constants/actionTypes";

import ArticlesList from "../components/ArticlesList";
import Pagination from "../components/Pagination";

const My_ARTICLES = "My Articles";
const FAVORITED_ARTICLES = "Favorited Articles";

class User extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.match.params.userName,
      tab: My_ARTICLES,
    };
    this.handlePageChange = (page) => {
      if (this.state.tab === My_ARTICLES) {
        this.props.getProfilesArticle(this.state.userName, page);
      }
      if (this.state.tab === FAVORITED_ARTICLES) {
        this.props.getFavoritedArticle(this.state.userName, page);
      }
    };

    this.handleChangeTab = (type) => (ev) => {
      ev.preventDefault();
      if (this.state.tab === type) return;
      this.setState(
        {
          tab: type,
        },
        () => {
          debugger;
          this.handlePageChange(1);
        }
      );
    };
  }
  render() {
    const profiles = this.props.profile;
    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img className="user-img" src={profiles.image} alt="" />
                <h4>{profiles.username}</h4>
                <p>{profiles.bio}</p>
                <div>
                  <Link
                    className="btn btn-sm btn-outline-secondary action-btn"
                    to="/settings"
                  >
                    <i className="ion-gear-a"></i> Edit Profile Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <Link
                        to={`/@${profiles.username}`}
                        className={
                          this.state.tab === My_ARTICLES
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={this.handleChangeTab(My_ARTICLES)}
                      >
                        {My_ARTICLES}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`/@${profiles.username}/favorites`}
                        className={
                          this.state.tab === FAVORITED_ARTICLES
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={this.handleChangeTab(FAVORITED_ARTICLES)}
                      >
                        {FAVORITED_ARTICLES}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <ArticlesList list={this.props.list} />
              {this.props.count > 0 && (
                <Pagination
                  page={this.props.page}
                  limit={this.props.limit}
                  total={this.props.count}
                  pagination={this.handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const userName = this.state.userName;
    this.props.getProfile(userName);
    this.props.getProfilesArticle(userName, this.props.page);
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
    page: state.profile.page,
    limit: state.profile.limit,
    count: state.profile.count,
    list: state.profile.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (userName) => {
      dispatch({ type: GET_USER_PROFILE, payload: { userName } });
    },
    getProfilesArticle: (userName, page) => {
      dispatch({ type: GET_PROFILE_ARTICLE, payload: { userName, page } });
    },
    getFavoritedArticle: (userName, page) => {
      dispatch({ type: GET_PROFILE_FAVORITED, payload: { userName, page } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
