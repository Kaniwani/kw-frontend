// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import appSagas from 'containers/App/sagas';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  injectSagas(appSagas); // all routes can access the global sagas

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage/reducer'),
          // System.import('containers/HomePage/sagas'),
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, /* sagas, */ component]) => {
          injectReducer('home', reducer.default);
          // injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/review',
      name: 'review',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ReviewPage/reducer'),
          System.import('containers/ReviewPage/sagas'),
          System.import('containers/ReviewPage/'),
        ]);
        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('review', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      indexRoute: {
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import('containers/ReviewSession'),
          ]);
          const renderRoute = loadModule(cb);

          importModules.then(([component]) => {
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      },
      childRoutes: [
        {
          path: '/review/summary',
          name: 'review summary',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/ReviewSummary'),
            ]);
            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    },
    {
      path: '/vocabulary',
      name: 'vocabulary',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/VocabularyPage/reducer'),
          System.import('containers/VocabularyPage/sagas'),
          System.import('containers/VocabularyPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('vocabulary', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/vocabulary/:level',
      name: 'vocabulary level',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/VocabularyPage/reducer'),
          System.import('containers/VocabularyPage/sagas'),
          System.import('containers/VocabularyLevel'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('vocabulary', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/vocabulary/:level/:id',
      name: 'vocabulary detail',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/VocabularyPage/reducer'),
          System.import('containers/VocabularyPage/sagas'),
          System.import('containers/VocabularyDetail'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('vocabulary', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/settings',
      name: 'settingsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/SettingsPage/reducer'),
          System.import('containers/SettingsPage/sagas'),
          System.import('containers/SettingsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('settingsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/about',
      name: 'aboutPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/AboutPage/reducer'),
          System.import('containers/AboutPage/sagas'),
          System.import('containers/AboutPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('aboutPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
