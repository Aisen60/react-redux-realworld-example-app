import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ListErrors from "../components/ListErrors";
import { AUTH_LOGIN } from "../constants/actionTypes";
class Login extends PureComponent {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.updateState = (field) => (ev) => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };
    this.onSubmit = (ev) => {
      ev.stopPropagation();
      this.props.handleUserLogin(this.state.email, this.state.password);
    };
  }
  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link className="" to="/register">
                  Need an account?
                </Link>
              </p>
              <ListErrors errors={this.props.errors} />
              <form onSubmit={this.onSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.updateState("email")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.updateState("password")}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                  >
                    Sign in
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    errors: state.auth.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleUserLogin: (email, password) => {
      dispatch({ type: AUTH_LOGIN, payload: { email, password } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
