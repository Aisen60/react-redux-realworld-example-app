import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ListErrors from "../components/ListErrors";

import {
  GET_ARTICLE_DETAILS_NEW_POST,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
} from "../constants/actionTypes";

class Editor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      title: "",
      body: "",
      description: "",
      tagValue: "",
      tagList: [],
    };
    this.updateState = (field) => (ev) => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };
    this.addTag = (value) => {
      this.setState({
        tagValue: "",
        tagList: [...this.state.tagList, value],
      });
    };
    this.delTag = (index) => {
      const taglist = [...this.state.tagList];
      taglist.splice(index, 1);
      this.setState({
        tagList: [...taglist],
      });
    };
    this.submitForm = (ev) => {
      ev.stopPropagation();
      const data = Object.assign({}, this.state);
      delete data.tagValue;
      if (this.state.slug) {
        this.props.handleUpdateArticle(data);
      } else {
        delete data.slug;
        this.props.handleCreatedArticle(data);
      }
    };
  }

  render() {
    const { title, body, description, tagValue, tagList } = this.state;
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ListErrors errors={this.props.errors} />
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      value={title}
                      onChange={this.updateState("title")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      value={description}
                      onChange={this.updateState("description")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={body}
                      onChange={this.updateState("body")}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      value={tagValue}
                      onChange={this.updateState("tagValue")}
                      onKeyUp={(ev) => {
                        const keyCode = ev.keyCode,
                          value = ev.target.value;
                        if (keyCode === 13 && value.trim() !== "") {
                          ev.stopPropagation();
                          this.addTag(value);
                        }
                      }}
                    />
                    <TagListView tagList={tagList} delete={this.delTag} />
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    onClick={this.submitForm}
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const slug = this.state.slug;
    if (slug) {
      this.props.getCurrentArticle(slug);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { title } = this.state;
    if (nextProps.article && title === "") {
      this.setState(
        Object.assign({}, this.state, {
          title: nextProps.article.title || "",
          body: nextProps.article.body || "",
          description: nextProps.article.description || "",
          tagValue: "",
          tagList: nextProps.article.tagList || [],
        })
      );
    }
  }
}

const TagListView = (props) => {
  const tagList = props.tagList,
    deleteFn = props.delete;
  if (tagList.length) {
    return tagList.map((item, index) => {
      return (
        <span
          className="tag-default tag-pill"
          key={item + "-" + index}
          onClick={() => {
            deleteFn(index);
          }}
        >
          <i className="ion-close-round"></i>
          {item}
        </span>
      );
    });
  }
  return null;
};

const mapStateToProps = (state) => {
  return {
    article: state.editor.article,
    errors: state.editor.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentArticle(slug) {
      dispatch({ type: GET_ARTICLE_DETAILS_NEW_POST, payload: { slug } });
    },
    handleCreatedArticle: (data) => {
      dispatch({ type: CREATE_ARTICLE, payload: { data } });
    },
    handleUpdateArticle: (data) => {
      dispatch({ type: UPDATE_ARTICLE, payload: { data } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
