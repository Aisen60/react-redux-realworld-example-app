import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ListErrors from "../components/ListErrors";
import { changeAppNav, userRegister } from "../store/actionCreators";
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
    this.changeUserName = (ev) => {
      this.setState({ username: ev.target.value });
    };
    this.changeEmail = (ev) => {
      this.setState({ email: ev.target.value });
    };
    this.changePassword = (ev) => {
      this.setState({ password: ev.target.value });
    };

    this.submitForm = (ev) => {
      ev.preventDefault();
      const data = {
        user: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        },
      };
      this.props.handleUserRegister(data);
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
              <form onSubmit={this.submitForm}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={(ev) => {
                        this.changeUserName(ev);
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={(ev) => {
                        this.changeEmail(ev);
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(ev) => {
                        this.changePassword(ev);
                      }}
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
  componentDidMount() {
    this.props.changePageTab();
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePageTab: () => {
      const action = changeAppNav("Sign up");
      dispatch(action);
    },
    handleUserRegister: (data) => {
      const action = userRegister(data);
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
