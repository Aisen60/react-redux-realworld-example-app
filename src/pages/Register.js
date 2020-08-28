import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ListErrors from "../components/ListErrors";
import { AUTH_REGISTER } from "../constants/actionTypes";
class Login extends PureComponent {
  constructor() {
    super();
    this.state = {
      username: "",
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
      this.props.handleAuthRegister(
        this.state.username,
        this.state.email,
        this.state.password
      );
    };
  }
  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link className="" to="/login">
                  Have an account?
                </Link>
              </p>
              <ListErrors errors={this.props.errors} />
              <form onSubmit={this.onSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.updateState("username")}
                    />
                  </fieldset>
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
                      value={this.props.password}
                      onChange={this.updateState("password")}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                  >
                    Sign up
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
    username: state.auth.username,
    email: state.auth.email,
    password: state.auth.password,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAuthRegister: (username, email, password) => {
      dispatch({ type: AUTH_REGISTER, payload: { username, email, password } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
