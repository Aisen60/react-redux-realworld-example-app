import React, { PureComponent } from "react";
import { connect } from "react-redux";
import marked from "marked";
import ArticleMeta from "../components/ArticleMeta";
import TagList from "../components/TagList";
import ListErrors from "../components/ListErrors";
import { Link } from "react-router-dom";
import { parseTime } from "../utils";

import {
  GET_ARTICLE_DETAILS,
  ARTICLE_FOLLOW_USER,
  ARTICLE_UNFOLLOW_USER,
  ARTICLE_FAVORITE,
  ARTICLE_UNFAVORITE,
  GET_ARTICLE_COMMENTS,
  CREATE_ARTICLE_COMMENTS,
  DELETE_ARTICLE_COMMENTS,
} from "../constants/actionTypes";

class Article extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      textValue: "",
    };

    this.handleTextChange = (ev) => {
      this.setState({
        textValue: ev.target.value,
      });
    };

    this.handleCreateComments = () => {
      const slug = this.state.slug,
        comment = {
          body: this.state.textValue,
        };
      this.props.handleCreateComments(slug, comment);
    };

    this.handleDeleteComments = (commentId) => {
      const slug = this.state.slug;
      this.props.handleDeleteComments(slug, commentId);
    };
  }

  render() {
    const articleDetails = this.props.article;
    if (Object.keys(articleDetails).length > 0) {
      return (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{articleDetails.title}</h1>
              <Author
                article={articleDetails}
                unFollow={this.props.handleUnFollow}
                follow={this.props.handleFollow}
                favorite={this.props.handleFavorite}
                unfavorite={this.props.handleUnfavorite}
              />
            </div>
          </div>
          <div className="container page">
            <div className="row article-content">
              <div className="col-xs-12">
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked(articleDetails.body),
                  }}
                ></div>
                <TagList
                  tagList={articleDetails.tagList}
                  tagClassName="tag-outline"
                ></TagList>
              </div>
            </div>
            <hr />
            <div className="article-actions">
              <Author
                article={articleDetails}
                unFollow={this.props.handleUnFollow}
                follow={this.props.handleFollow}
                favorite={this.props.handleFavorite}
                unfavorite={this.props.handleUnfavorite}
              />
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <Comment
                  currentUser={this.props.userInfo}
                  errors={this.props.errors}
                  textChange={this.handleTextChange}
                  create={() => {
                    this.setState({
                      textValue: "",
                    });
                    this.handleCreateComments();
                  }}
                  value={this.state.textValue}
                />
                <CommentCard
                  currentUser={this.props.userInfo}
                  comments={this.props.comments}
                  delete={this.handleDeleteComments}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
  componentDidMount() {
    const slug = this.state.slug;
    this.props.getCurrentArticle(slug);
    this.props.getCurrentComments(slug);
  }
}

const Author = (props) => {
  const article = props.article,
    following = article.author.following,
    favorited = article.favorited;
  return (
    <ArticleMeta article={article}>
      <span>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => {
            following
              ? props.unFollow(article.author.username)
              : props.follow(article.author.username);
          }}
        >
          <i className="ion-plus-round"></i>
          <span>&nbsp;</span>
          <span>
            {following ? "Unfollow" : "Follow"} {article.author.username}
          </span>
        </button>
        <span>&nbsp;&nbsp;</span>
        <button
          className={
            favorited
              ? "btn btn-sm btn-primary"
              : "btn btn-sm btn-outline-primary"
          }
          onClick={() => {
            favorited
              ? props.unfavorite(article.slug)
              : props.favorite(article.slug);
          }}
        >
          <i className="ion-heart"></i>
          <span>&nbsp;</span>
          <span>{favorited ? "Unfavorite" : "Favorite"} Article</span>
          <span>&nbsp;</span>
          <span className="counter">({article.favoritesCount})</span>
        </button>
      </span>
    </ArticleMeta>
  );
};

const Comment = (props) => {
  const currentUser = props.currentUser;
  if (Object.keys(currentUser).length > 0) {
    const styleClass = {
      marginTop: "0px",
      marginBottom: "0px",
      height: "80px",
    };
    return (
      <div>
        <ListErrors errors={props.errors} />
        <form className="card comment-form" onSubmit={props.create}>
          <div className="card-block">
            <textarea
              placeholder="Write a comment..."
              value={props.value}
              rows="3"
              className="form-control"
              style={styleClass}
              onChange={props.textChange}
            ></textarea>
          </div>
          <div className="card-footer">
            <img className="comment-author-img" alt="" />
            <button className="btn btn-sm btn-primary">Post Comment</button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <p>
      <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link> to
      add comments on this article.
    </p>
  );
};

const CommentCard = (props) => {
  const currentUser = props.currentUser,
    comments = props.comments;
  if (comments.length > 0) {
    return comments.map((item) => {
      return (
        <div className="card" key={item.id}>
          <div className="card-block">
            <p className="card-text">{item.body}</p>
          </div>
          <div className="card-footer">
            <Link to={`@${item.author.username}`}>
              <img
                src={item.author.image}
                alt=""
                className="comment-author-img"
              />
            </Link>
            &nbsp;
            <Link className="comment-author" to={`@${item.author.username}`}>
              {item.author.username}
            </Link>
            <span className="date-posted">
              {parseTime(new Date(item.updatedAt))}
            </span>
            {Object.keys(currentUser).length > 0 &&
              item.author.username === currentUser.username && (
                <span
                  className="mod-options"
                  onClick={() => {
                    props.delete(item.id);
                  }}
                >
                  <i className="ion-trash-a"></i>
                </span>
              )}
          </div>
        </div>
      );
    });
  }
  return null;
};

const mapStateToProps = (state) => {
  return {
    article: state.article.article,
    comments: state.article.comments,
    errors: state.article.errors,
    userInfo: state.auth.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * 获取文章详情
     * @param {string} slug 文章标识
     */
    getCurrentArticle(slug) {
      dispatch({ type: GET_ARTICLE_DETAILS, payload: { slug } });
    },
    /**
     * 获取文章评论
     * @param {string} slug 文章标识
     */
    getCurrentComments(slug) {
      dispatch({ type: GET_ARTICLE_COMMENTS, payload: { slug } });
    },
    /**
     * 评价文章
     * @param {string} slug 文章标识
     * @param {string} comment 评价内容
     */
    handleCreateComments(slug, comment) {
      dispatch({ type: CREATE_ARTICLE_COMMENTS, payload: { slug, comment } });
    },
    /**
     *
     * @param {string} slug 文章标识
     * @param {string} commentId 文章id
     */
    handleDeleteComments(slug, commentId) {
      dispatch({ type: DELETE_ARTICLE_COMMENTS, payload: { slug, commentId } });
    },
    /**
     * 关注用户
     * @param {string} userName 用户名称
     */
    handleFollow(userName) {
      dispatch({
        type: ARTICLE_FOLLOW_USER,
        payload: { userName },
      });
    },
    /**
     * 取消关注用户
     * @param {string} userName 用户名称
     */
    handleUnFollow(userName) {
      dispatch({
        type: ARTICLE_UNFOLLOW_USER,
        payload: { userName },
      });
    },
    /**
     * 点赞文章
     * @param {string} slug 文章标识
     */
    handleFavorite(slug) {
      dispatch({
        type: ARTICLE_FAVORITE,
        payload: { slug },
      });
    },
    /**
     * 取消点赞文章
     * @param {string} slug 文章标识
     */
    handleUnfavorite(slug) {
      dispatch({
        type: ARTICLE_UNFAVORITE,
        payload: { slug },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
