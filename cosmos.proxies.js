// cosmos.proxies.js
import createLocalStorageProxy from "react-cosmos-localstorage-proxy";
import createFetchProxy from "react-cosmos-fetch-proxy";
import createReduxProxy from "react-cosmos-redux-proxy";
import createRouterProxy from "react-cosmos-router-proxy";
import createWrapperProxy from "react-cosmos-wrapper-proxy";

import Container from "base/Container";
import configureStore from "./app/store";

const wrapperProxy = createWrapperProxy({
  // Required
  component: Container, // The wrapper component
  fixtureKey: "withCosmosWrapper", // Used for toggling (or passing props)
});

// Order matters
export default [
  wrapperProxy,
  createLocalStorageProxy(),
  createFetchProxy(),
  createReduxProxy({ createStore: (state) => configureStore(state).store }),
  createRouterProxy(),
];
