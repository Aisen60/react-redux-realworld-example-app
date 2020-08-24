import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ListErrors from "../components/ListErrors";

import {
  getUserInfo,
  handleSettingInputChange,
  changeCurrentUser,
  cleanUserInfo,
} from "../store/actionCreators";

class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { image, username, bio, email, password } = this.props.currentUser;
    // const userInfo = this.props.userInfo;
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              <ListErrors errors={this.props.errors} />
              <form
                onSubmit={() => {
                  this.props.handleChangeUserInfo({
                    user: this.props.currentUser,
                  });
                }}
              >
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      placeholder="URL of profile picture"
                      className="form-control"
                      value={image || ""}
                      onChange={(ev) => {
                        this.props.handleInputChange(this, "image", ev);
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      placeholder="Your username"
                      className="form-control form-control-lg"
                      value={username || ""}
                      onChange={(ev) => {
                        this.props.handleInputChange(this, "username", ev);
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      rows="8"
                      placeholder="Short bio about you"
                      className="form-control form-control-lg"
                      value={bio || ""}
                      onChange={(ev) => {
                        this.props.handleInputChange(this, "bio", ev);
                      }}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      placeholder="Email"
                      className="form-control form-control-lg"
                      value={email || ""}
                      onChange={(ev) => {
                        this.props.handleInputChange(this, "email", ev);
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control form-control-lg"
                      value={password || ""}
                      onChange={(ev) => {
                        this.props.handleInputChange(this, "password", ev);
                      }}
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
                onClick={this.props.handleUserLogout}
              >
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    userInfo: state.userInfo,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfoDispatch: () => {
      const action = getUserInfo();
      dispatch(action);
    },
    handleInputChange: (that, type, ev) => {
      const data = Object.assign({}, that.props.currentUser);
      data[type] = ev.target.value;
      const action = handleSettingInputChange(data);
      dispatch(action);
    },
    handleChangeUserInfo: (userInfo) => {
      const action = changeCurrentUser(userInfo);
      dispatch(action);
    },
    handleUserLogout: () => {
      const action = cleanUserInfo();
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
