import actionCreator from 'utils/actionCreator';
import types from './constants';

const actions = {
  updateGlobal: actionCreator(types.GLOBAL.UPDATE, 'globalState'),
  srsRequest: actionCreator(types.SRS.REQUEST),
  srsRequestSuccess: actionCreator(types.SRS.SUCCESS, 'count', 'notification'),
  srsRequestFailure: actionCreator(types.SRS.FAILURE, 'notification'),
  loadUserRequest: actionCreator(types.USER.LOAD.REQUEST, 'loading'),
  loadUserSuccess: actionCreator(types.USER.LOAD.SUCCESS, 'data'),
  loadUserFailure: actionCreator(types.USER.LOAD.FAILURE, 'notification'),
  loadReviewsRequest: actionCreator(types.REVIEWS.LOAD.REQUEST, 'loading'),
  loadReviewsSuccess: actionCreator(types.REVIEWS.LOAD.SUCCESS, 'data'),
  loadReviewsFailure: actionCreator(types.REVIEWS.LOAD.FAILURE, 'notification'),
};

export default actions;
