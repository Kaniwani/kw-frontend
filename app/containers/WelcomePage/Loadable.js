/**
 *
 * Asynchronously loads the component for WelcomePage
 *
 */

import Loadable from 'routing/Loadable';

export default Loadable({
  loader: ({ injectReducer }) =>
    Promise.all([
      import('./reducer'),
      import('./index'),
    ])
    .then(([reducer, component]) => {
      injectReducer('welcomePage', reducer.default);

      return component;
    }),
});
