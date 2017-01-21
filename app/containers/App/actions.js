import actionCreator from 'utils/actionCreator';
import types from './constants';

const actions = {
  updateGlobal: actionCreator(types.GLOBAL.UPDATE, 'globalState'),
  loginRequest: actionCreator(types.AUTH.LOGIN.REQUEST),
  loginRequestSuccess: actionCreator(types.AUTH.LOGIN.SUCCESS, 'token'),
  loginRequestFailure: actionCreator(types.AUTH.LOGIN.FAILURE, 'notification'),
  srsRequest: actionCreator(types.USER.SRS.REQUEST),
  srsRequestSuccess: actionCreator(types.USER.SRS.SUCCESS, 'count', 'notification'),
  srsRequestFailure: actionCreator(types.USER.SRS.FAILURE, 'notification'),
  loadUserRequest: actionCreator(types.USER.LOAD.REQUEST, 'loading'),
  loadUserSuccess: actionCreator(types.USER.LOAD.SUCCESS, 'data'),
  loadUserFailure: actionCreator(types.USER.LOAD.FAILURE, 'notification'),
  loadReviewsRequest: actionCreator(types.REVIEWS.LOAD.REQUEST, 'loading'),
  loadReviewsSuccess: actionCreator(types.REVIEWS.LOAD.SUCCESS, 'data'),
  loadReviewsFailure: actionCreator(types.REVIEWS.LOAD.FAILURE, 'notification'),
};

export default actions;
