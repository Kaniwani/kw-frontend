import Loadable from 'routing/Loadable';

export default Loadable({
  loader: ({ injectLogic }) =>
    Promise.all([
      import('./logic'),
      import('./index'),
    ])
    .then(([logic, component]) => {
      injectLogic(logic.default, logic.onLogicInit);

      return component;
    }),
});
