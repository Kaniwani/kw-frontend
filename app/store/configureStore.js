import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogicMiddleware } from 'redux-logic';
import { routerMiddleware } from 'react-router-redux';
import { persistStore } from 'redux-persist';
import Raven from 'common/raven';
import createRavenMiddleware from 'raven-for-redux';
import { omit } from 'lodash';

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

  const ravenMiddleware = createRavenMiddleware(Raven, {
    stateTransformer: (state) => omit(state, ['entities.vocab', 'entities.reviews', 'entities.synonyms']),
    getUserContext: (state) => state.entities.user,
  });

  const middlewares = [routerMiddleware(history), logicMiddleware, ravenMiddleware];

  const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

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
