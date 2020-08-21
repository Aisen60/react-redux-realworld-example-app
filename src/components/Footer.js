import React from "react";
const style = {
  position: "fixed",
  bottom: "0",
  width: "100%",
  background: "linear-gradient(#485563, #29323c)",
  textAlign: "center",
  padding: "15px",
  boxShadow: "0 5px 5px 5px rgba(0,0,0,0.4)",
  zIndex: 999,
  color: "#fff",
  fontSize: "1.5rem",
  display: "block",
};
export default () => {
  return (
    <a
      rel="noopener noreferrer"
      href="https://github.com/Aisen60/react-redux-realworld-example-app"
      target="_blank"
      style={style}
    >
      <i className="ion-social-github"></i>
      &nbsp;&nbsp;Fork on GitHub
    </a>
  );
};
