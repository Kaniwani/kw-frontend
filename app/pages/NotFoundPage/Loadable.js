import Loadable from 'common/routing/Loadable';

export default Loadable({
  loader: () => import('./index'),
});
