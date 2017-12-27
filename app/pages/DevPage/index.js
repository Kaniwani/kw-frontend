/*
  This page is just for isolated testing of components within the app using Hot Module Replacement.
  Content is not important, welcome to clear it anytime.
*/

import React from "react";
import HomePage from 'pages/HomePage/Loadable';

// import ReactInterval from "react-interval";

class DevPage extends React.Component {
  state = {};
  // updateState = () =>
  //   this.setState((prevState) => ({ }));

  render() {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
}

export default DevPage;
