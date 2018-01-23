import Loadable from 'common/components/Loadable';

export default Loadable({
  loader: () => import('./index'),
});
