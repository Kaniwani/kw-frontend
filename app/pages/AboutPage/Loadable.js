/**
 *
 * Asynchronously loads the component for AboutPage
 *
 */

import Loadable from 'routing/Loadable';

export default Loadable({
  loader: () => import('./index'),
});
