/* eslint-disable import/first */

// Temporary hack to suppress react RAF test error
// https://github.com/facebookincubator/create-react-app/issues/3199
import "raf/polyfill";
window.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
  return 0;
};

// enzyme setup
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
