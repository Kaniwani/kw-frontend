import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogicMiddleware } from 'redux-logic';
import { routerMiddleware } from 'react-router-redux';
import { persistStore } from 'redux-persist';

import * as api from 'common/api';
import * as serializers from 'common/serializers';
import { IS_DEV_ENV } from 'common/constants';
import rootLogic from 'common/logic';
import rootReducer from 'reducers/rootReducer';

export default function configureStore(preloadedState, history) {
  // inject dependencies to be accessed within logics
  const logicMiddleware = createLogicMiddleware(rootLogic, {
    api,
    serializers,
    history,
  });

  const middlewares = [routerMiddleware(history), logicMiddleware];

  // Enforces state to be read-only (in dev) - it'll throw if we try to mutate
  if (IS_DEV_ENV) {
    const freeze = require('redux-freeze'); // eslint-disable-line global-require
    middlewares.push(freeze);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);
  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(...storeEnhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancer);

  const persistor = persistStore(store);

  if (IS_DEV_ENV) {
    if (module.hot) {
      module.hot.accept('reducers/rootReducer', () => {
        const newRootReducer = require('reducers/rootReducer').default;
        store.replaceReducer(newRootReducer);
      });
    }
  }

  return { persistor, store };
}
