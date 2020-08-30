import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ListErrors from "../components/ListErrors";
import { AUTH_CURRENT, AUTH_SAVE, AUTH_CLEAN } from "../constants/actionTypes";
import { destroyToken } from "../utils";
import history from "../router/history";
class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      username: null,
      bio: null,
      email: null,
      password: null,
    };
    this.updateState = (field) => (ev) => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };
    this.onSubmit = (ev) => {
      ev.preventDefault();
      const user = this.state;
      this.props.saveUserInfo(user);
    };
  }
  render() {
    const { image, username, bio, email, password } = this.state;
    // const userInfo = this.props.userInfo;
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              <ListErrors errors={this.props.errors} />
              <form onSubmit={this.onSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      placeholder="URL of profile picture"
                      className="form-control"
                      value={image || ""}
                      onChange={this.updateState("image")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      placeholder="Your username"
                      className="form-control form-control-lg"
                      value={username || ""}
                      onChange={this.updateState("username")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      rows="8"
                      placeholder="Short bio about you"
                      className="form-control form-control-lg"
                      value={bio || ""}
                      onChange={this.updateState("bio")}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      placeholder="Email"
                      className="form-control form-control-lg"
                      value={email || ""}
                      onChange={this.updateState("email")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control form-control-lg"
                      value={password || ""}
                      onChange={this.updateState("password")}
                    />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right">
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr></hr>
              <button
                className="btn btn-outline-danger"
                onClick={this.props.userLogout}
              >
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    const { username } = this.state;
    if (nextProps.userInfo && username === null) {
      this.setState(
        Object.assign({}, this.state, {
          image: nextProps.userInfo.image || "",
          username: nextProps.userInfo.username,
          bio: nextProps.userInfo.bio,
          email: nextProps.userInfo.email,
          password: nextProps.userInfo.password || "",
        })
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    errors: state.auth.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => {
      dispatch({ type: AUTH_CURRENT });
    },
    saveUserInfo: (user) => {
      dispatch({ type: AUTH_SAVE, payload: { user } });
    },
    userLogout: (ev) => {
      ev.preventDefault();
      destroyToken();
      history.push("/");
      dispatch({ type: AUTH_CLEAN });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
