import actionCreator from 'utils/actionCreator';
import types from './constants';

const actions = {
  addSynonymRequest: actionCreator(types.ADD.REQUEST, 'synonym'),
  addSynonymSuccess: actionCreator(types.ADD.SUCCESS, 'synonym', 'notification'),
  addSynonymFailure: actionCreator(types.ADD.FAILURE, 'notification'),
  removeSynonymRequest: actionCreator(types.REMOVE.REQUEST, 'synonym'),
  removeSynonymSuccess: actionCreator(types.REMOVE.SUCCESS, 'synonym', 'notification'),
  removeSynonymFailure: actionCreator(types.REMOVE.FAILURE, 'notification'),
};

export default actions;
