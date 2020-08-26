import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter, Route } from "react-router-dom";
import history from "./utils/history";
import loadable from "./utils/loadable";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getUserInfo } from "./store/actionCreators";
import { getToken } from "./utils";

const Home = loadable(() => import("./pages/Home"));
const Login = loadable(() => import("./pages/Login"));
const Register = loadable(() => import("./pages/Register"));
const Article = loadable(() => import("./pages/Article"));
const Settings = loadable(() => import("./pages/Settings"));
const Editor = loadable(() => import("./pages/Editor"));
const Profile = loadable(() => import("./pages/Profile"));
const Test = loadable(() => import("./pages/Test"));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter history={history}>
          <Header />
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/article/:slug" exact component={Article}></Route>
          <Route path="/editor/:slug?" exact component={Editor}></Route>
          <Route path="/settings" exact component={Settings}></Route>
          <Route path="/:profile/:type?" component={Profile}></Route>
          <Footer />
        </HashRouter>
      </Provider>
    );
  }
  componentDidMount() {
    if (getToken()) {
      const action = getUserInfo();
      store.dispatch(action);
    }
  }
}

export default App;
