import Loadable from 'routing/Loadable';

export default Loadable({
  loader: ({ injectReducer, injectLogic }) =>
    Promise.all([
      import('./reducer'),
      import('./logic'),
      import('./index'),
    ])
      .then(([reducer, logic, component]) => {
        injectReducer('quiz', reducer.default);
        injectLogic(logic.default, logic.onLogicInit);

        return component;
      }),
});
