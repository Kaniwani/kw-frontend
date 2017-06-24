/**
 *
 * Asynchronously loads the component for VocabEntryPage
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
      injectReducer('vocabEntryPage', reducer.default);

      return component;
    }),
});
