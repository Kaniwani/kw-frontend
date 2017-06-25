/**
 *
 * Asynchronously loads the component for SessionSummaryPage
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
      injectReducer('sessionSummaryPage', reducer.default);

      return component;
    }),
});
