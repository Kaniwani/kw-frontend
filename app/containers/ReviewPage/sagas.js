// This saga is loaded async whenever we hit a route that is nested under /review/
// So its only purpose is to collect child sagas

import reviewSessionSagas from 'containers/ReviewSession/sagas';
import reviewSummarySagas from 'containers/ReviewSummary/sagas';

// Bootstrap sagas
export default [
  ...reviewSessionSagas,
  ...reviewSummarySagas,
];
