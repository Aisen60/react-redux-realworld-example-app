import React from "react";
import { connect } from "react-redux";
import { HashRouter } from "react-router-dom";
import history from "../router/history";
import router from "./config";
import PrivateRoute from "./PrivateRoute";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CHANGE_COMMON_NAV, AUTH_CURRENT } from "../constants/actionTypes";

let _that;

class RouterView extends React.Component {
  constructor(props) {
    super(props);
    _that = this;
  }
  render() {
    return (
      <HashRouter history={history}>
        <Header />
        {router.map((r) => {
          return (
            <PrivateRoute
              path={r.path}
              exact={r.exact}
              component={r.component}
              checked={r.checked}
              key={r.path}
              authenticated={true}
            />
          );
        })}
        <Footer />
      </HashRouter>
    );
  }
  componentDidMount() {
    this.props.changeCommonNav(history.location.pathname);
    this.props.authenticated && this.props.getUserInfo();
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.jwToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => {
      dispatch({ type: AUTH_CURRENT });
    },
    changeCommonNav: (path) => {
      const action = { type: CHANGE_COMMON_NAV, payload: { path } };
      dispatch(action);
    },
  };
};

//路由拦截
history.listen((location, action) => {
  _that.props.changeCommonNav(location.pathname);
});

export default connect(mapStateToProps, mapDispatchToProps)(RouterView);
