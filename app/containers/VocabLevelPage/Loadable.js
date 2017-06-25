/**
 *
 * Asynchronously loads the component for VocabLevelPage
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
      injectReducer('vocabLevelPage', reducer.default);

      return component;
    }),
});
