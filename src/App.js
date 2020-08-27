import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import RouterView from "./router/RouterView";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterView></RouterView>
      </Provider>
    );
  }
}

export default App;
