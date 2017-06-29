/**
 *
 * Asynchronously loads the component for HomePage
 *
 */

import Loadable from 'routing/Loadable';

export default Loadable({
  loader: ({ injectReducer, injectLogic }) =>
    Promise.all([
      import('./reducer'),
      import('./logic'),
      import('./index'),
    ])
    .then(([reducer, logic, component]) => {
      injectReducer('homePage', reducer.default);
      injectLogic(logic.default, logic.onLogicInit);

      return component;
    }),
});
