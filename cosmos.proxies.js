// cosmos.proxies.js
import createLocalStorageProxy from "react-cosmos-localstorage-proxy";
import createFetchProxy from "react-cosmos-fetch-proxy";
import createReduxProxy from "react-cosmos-redux-proxy";
import createRouterProxy from "react-cosmos-router-proxy";
import createWrapperProxy from "react-cosmos-wrapper-proxy";

import Container from "common/components/Container";
import XRay from 'react-x-ray';
import configureStore from "./app/store/configureStore";

const wrapperProxy = createWrapperProxy({
  component: Container, // The wrapper component
  fixtureKey: "withCosmosWrapper", // Used for toggling (or passing props)
});

const withXRayProxy = createWrapperProxy({
  component: XRay,
  fixtureKey: 'withCosmosXRay',
  props: {
    grid: true, // (number or boolean) pixel dimensions of background grid
    outline: true, // (boolean) show element outlines
    center: true, // (boolean) center the background grid
    // color: 'red', // (string) base color for grid and outlines
    // backgroundColor: 'blue', // (string) background color of XRay component
  },
});

// Order matters
export default [
  wrapperProxy,
  withXRayProxy,
  createLocalStorageProxy(),
  createFetchProxy(),
  createReduxProxy({ createStore: (state) => configureStore(state).store }),
  createRouterProxy(),
];
