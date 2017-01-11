import { fromJS } from 'immutable';
/* eslint-disable import/prefer-default-export */
export const navRoutes = fromJS([
  {
    text: 'Reviews',
    to: '/review',
  }, {
    text: 'Vocabulary',
    to: '/vocabulary',
  }, {
    text: 'Settings',
    to: '/settings',
  }, {
    text: 'About',
    to: '/about',
  }, {
    text: 'Logout',
    to: '/logout',
  },
]);
/* eslint-enable */
