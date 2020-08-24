import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ListErrors from "../components/ListErrors";
import {
  getArticleDetails,
  cleanEditor,
  setEditor,
  addTagList,
  deleteTagList,
  createdArticle,
  updateArticle,
} from "../store/actionCreators";
class Editor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
    };
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  render() {
    const {
      title,
      body,
      description,
      tagValue,
      tagList,
    } = this.props.currentEditor;
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
                      onChange={(ev) =>
                        this.props.handleChangeValue(this, "title", ev)
                      }
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      value={description}
                      onChange={(ev) =>
                        this.props.handleChangeValue(this, "description", ev)
                      }
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={body}
                      onChange={(ev) =>
                        this.props.handleChangeValue(this, "body", ev)
                      }
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      value={tagValue}
                      onChange={(ev) =>
                        this.props.handleChangeValue(this, "tagValue", ev)
                      }
                      onKeyDown={(ev) => {
                        const keyCode = ev.keyCode,
                          value = ev.target.value;
                        if (keyCode === 13 && value.trim() !== "") {
                          this.props.handleAddTagList(value);
                        }
                      }}
                    />
                    <TagListView
                      tagList={tagList}
                      delete={this.props.handleDeleteTag}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    onClick={this.handleConfirm}
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
    } else {
      this.props.handleCleanEditor();
    }
  }

  handleConfirm() {
    const slug = this.state.slug;
    if (slug) {
      this.props.handleUpdateArticle(this.props.currentEditor);
    } else {
      this.props.handleCreatedArticle(this.props.currentEditor);
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
    currentEditor: state.currentEditor,
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCleanEditor() {
      const action = cleanEditor();
      dispatch(action);
    },
    getCurrentArticle(slug) {
      const action = getArticleDetails(slug);
      dispatch(action);
    },
    handleChangeValue: (that, type, ev) => {
      const data = Object.assign({}, that.props.currentEditor);
      data[type] = ev.target.value;
      const action = setEditor(data);
      dispatch(action);
    },
    handleAddTagList: (value) => {
      const action = addTagList(value);
      dispatch(action);
    },
    handleDeleteTag: (index) => {
      const action = deleteTagList(index);
      dispatch(action);
    },
    handleCreatedArticle: (data) => {
      const action = createdArticle({ article: data });
      dispatch(action);
    },
    handleUpdateArticle: (data) => {
      const obj = {
        slug: data.slug,
        details: { article: data },
      };
      const action = updateArticle(obj);
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
