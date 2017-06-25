/**
 *
 * Asynchronously loads the component for VocabLevelsPage
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
      injectReducer('vocabLevelsPage', reducer.default);

      return component;
    }),
});
