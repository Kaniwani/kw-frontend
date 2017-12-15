/**
 * Test store addons
 */

import { browserHistory } from "react-router";
import configureStore from "../store";

describe("configureStore", () => {
  let store;

  beforeAll(() => {
    // NOTE: configureStore returns { persistor, store } while using redux-persist
    store = configureStore({}, browserHistory).store; // eslint-disable-line
  });

  describe("asyncReducers", () => {
    it("should contain an object for async reducers", () => {
      expect(typeof store.asyncReducers).toBe("object");
    });
  });

  describe("logicMiddleware", () => {
    it("should contain a hook for `logic middleware`", () => {
      expect(typeof store.logicMiddleware).toBe("function");
    });
  });
});
