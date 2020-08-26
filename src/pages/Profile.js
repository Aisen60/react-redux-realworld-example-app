import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getProfilesUser } from "../store/actionCreators";

import ArticlesList from "../components/ArticlesList";

class User extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const profiles = this.props.currentProfiles;
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
                  <a
                    href="#/settings"
                    className="btn btn-sm btn-outline-secondary action-btn"
                  >
                    <i className="ion-gear-a"></i> Edit Profile Settings
                  </a>
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
                      <a className="nav-link active" href="#@jienigui">
                        My Articles
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#@jienigui/favorites">
                        Favorited Articles
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              {/* <Switch>
                <Route
                  path="/:profile"
                  exact
                  render={() => {
                    return (
                      <>
                        <div>123</div>
                      </>
                    );
                  }}
                ></Route>
                <Route path="/:profile/:type" exact component={Test2}></Route>
              </Switch> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const profile = this.props.match.params.profile;
    this.props.getProfilesUserDispatchDispatch(profile.split("@")[1]);
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    currentProfiles: state.currentProfiles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfilesUserDispatchDispatch: (profile) => {
      const action = getProfilesUser(profile);
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
