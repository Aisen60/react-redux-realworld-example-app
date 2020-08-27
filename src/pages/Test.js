import React, { PureComponent } from "react";
import history from "../utils/history";
class Test extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        onClick={() => {
          history.push("/");
        }}
      >
        test
      </div>
    );
  }
}

export default Test;
