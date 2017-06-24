/**
 *
 * Asynchronously loads the component for SettingsPage
 *
 */

import Loadable from 'routing/Loadable';

export default Loadable({
  loader: () => import('./index'),
});
