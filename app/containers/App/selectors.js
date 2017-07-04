const selectLoading = (state) => state.global.loading;
const selectError = (state) => state.global.error;
const selectUser = (state) => state.global.user;
const selectDashboard = (state) => state.global.dashboard;
const selectSettings = (state) => state.global.settings;
const selectEntities = (state) => state.global.entities;
const makeSelectSessionCount = (category) => (state) => state.global.dashboard[`${category}Count`];
const selectReviewCount = makeSelectSessionCount('review');
const selectLessonCount = makeSelectSessionCount('lesson');

export {
  selectLoading,
  selectError,
  selectUser,
  selectDashboard,
  selectReviewCount,
  selectLessonCount,
  selectSettings,
  selectEntities,
};
