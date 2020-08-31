import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends React.PureComponent {
  render() {
    const {
      path,
      exact = false,
      component,
      checked = false,
      authenticated,
    } = this.props;
    return (
      <Route
        path={path}
        exact={exact}
        render={(props) => {
          // return React.createElement(component, props);
          if (!checked) {
            return React.createElement(component, props);
          } else if (checked && authenticated) {
            return React.createElement(component, props);
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            );
          }
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

export default PrivateRoute;
