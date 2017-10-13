import Loadable from 'routing/Loadable';

export default Loadable({
  loader: ({ injectReducer }) =>
    Promise.all([
      import('./reducer'),
      import('./index'),
    ])
      .then(([reducer, component]) => {
        injectReducer('vocabLevels', reducer.default);
        return component;
      }),
});
