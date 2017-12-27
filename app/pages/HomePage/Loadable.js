/**
 * Asynchronously loads the component for HomePage
 */
import Loadable from 'common/routing/Loadable';

export default Loadable({
  loader: () => import('./index'),
});
