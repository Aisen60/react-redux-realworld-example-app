import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="navbar-brand">
      conduit
    </Link>
  );
}

const NavItem = (props) => {
  const navName = props.name,
    to = props.to,
    className = props.active === to ? "nav-link active" : "nav-link",
    icon = props.icon;
  return (
    <li className="nav-item">
      <Link className={className} to={to}>
        {icon && <i className={icon}></i>}
        {props.children}
        {navName}
      </Link>
    </li>
  );
};

function LoggedOutView(props) {
  const currentUser = props.currentUser;
  if (Object.keys(currentUser).length === 0) {
    const loggedViewArr = [
      {
        name: "Home",
        to: "/",
      },
      {
        name: "Sign in",
        to: "/login",
      },
      {
        name: "Sign up",
        to: "/register",
      },
    ];

    return (
      <ul className="nav navbar-nav pull-xs-right">
        {loggedViewArr.map((nav) => {
          return (
            <NavItem
              name={nav.name}
              to={nav.to}
              active={props.active}
              key={nav.to}
            ></NavItem>
          );
        })}
      </ul>
    );
  }
  return null;
}

function LoggedInView(props) {
  const currentUser = props.currentUser;
  if (Object.keys(currentUser).length > 0) {
    const loggedViewArr = [
      {
        name: "Home",
        to: "/",
      },
      {
        name: "New Post",
        to: "/editor",
        icon: "ion-compose",
      },
      {
        name: "Setting",
        to: "/settings",
        icon: "ion-gear-a",
      },
      {
        name: currentUser.username,
        to: `@${currentUser.username}`,
        user: currentUser,
      },
    ];

    return (
      <ul className="nav navbar-nav pull-xs-right">
        {loggedViewArr.map((nav) => {
          return (
            <NavItem
              name={nav.name}
              to={nav.to}
              icon={nav.icon}
              active={props.active}
              user={nav.user}
              key={nav.to}
            >
              {nav.user && (
                <img src={nav.user.image} alt="" className="user-pic"></img>
              )}
            </NavItem>
          );
        })}
      </ul>
    );
  }
  return null;
}

class Header extends PureComponent {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Logo />
          <LoggedOutView
            active={this.props.navActive}
            currentUser={this.props.userInfo}
          />
          <LoggedInView
            active={this.props.navActive}
            currentUser={this.props.userInfo}
          />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    navActive: state.common.nav,
  };
};

export default connect(mapStateToProps, null)(Header);
