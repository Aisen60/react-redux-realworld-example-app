import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends React.PureComponent {
  render() {
    const {
      path,
      exact = false,
      component,
      checked = true,
      authenticated = true,
    } = this.props;
    return (
      <Route
        path={path}
        exact={exact}
        render={(props) => {
          return checked && authenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        }}
      ></Route>
    );
  }
}

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  component: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.jwToken,
  };  
};

export default connect(mapStateToProps, null)(PrivateRoute);
