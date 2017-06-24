/**
 *
 * Asynchronously loads the component for VocabularyPage
 *
 */

import Loadable from 'routing/Loadable';

export default Loadable({
  loader: () => import('./index'),
});
