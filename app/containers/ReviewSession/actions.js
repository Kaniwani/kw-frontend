import actionCreator from 'utils/actionCreator';
import types from './constants';

const actions = {
  setNewCurrent: actionCreator(types.CURRENT.SET_NEW),
  addCurrentToQueue: actionCreator(types.CURRENT.ADD_TO.QUEUE),
  addCurrentToComplete: actionCreator(types.CURRENT.ADD_TO.COMPLETE),
  addCurrentToCorrect: actionCreator(types.CURRENT.ADD_TO.CORRECT),
  addCurrentToIncorrect: actionCreator(types.CURRENT.ADD_TO.INCORRECT),
  addSynonymToCurrent: actionCreator(types.CURRENT.SYNONYM.ADD, 'synonym'),
  removeSynonymFromCurrent: actionCreator(types.CURRENT.SYNONYM.REMOVE, 'synonym'),
  increaseCurrentStreak: actionCreator(types.CURRENT.STREAK.INCREASE),
  decreaseCurrentStreak: actionCreator(types.CURRENT.STREAK.DECREASE),
  revertCurrentStreak: actionCreator(types.CURRENT.STREAK.REVERT),
  increaseCurrentCorrect: actionCreator(types.CURRENT.CORRECT.INCREASE),
  decreaseCurrentCorrect: actionCreator(types.CURRENT.CORRECT.DECREASE),
  increaseCurrentIncorrect: actionCreator(types.CURRENT.INCORRECT.INCREASE),
  decreaseCurrentIncorrect: actionCreator(types.CURRENT.INCORRECT.DECREASE),
  updateAnswer: actionCreator(types.ANSWER.UPDATE, 'update'),
  updateAnswerInput: actionCreator(types.ANSWER.INPUT, 'update'),
  markCorrect: actionCreator(types.ANSWER.MARK.CORRECT, 'update'),
  markIncorrect: actionCreator(types.ANSWER.MARK.INCORRECT, 'update'),
  markValid: actionCreator(types.ANSWER.MARK.VALID, 'update'),
  markInvalid: actionCreator(types.ANSWER.MARK.INVALID, 'update'),
  markIgnored: actionCreator(types.ANSWER.MARK.IGNORED, 'correct'),
  checkAnswer: actionCreator(types.ANSWER.CHECK),
  resetAnswer: actionCreator(types.ANSWER.RESET),
  recordAnswerRequest: actionCreator(types.ANSWER.RECORD.REQUEST),
  recordAnswerSuccess: actionCreator(types.ANSWER.RECORD.SUCCESS),
  recordAnswerFailure: actionCreator(types.ANSWER.RECORD.FAILURE),
  startAutoAdvance: actionCreator(types.AUTO_ADVANCE.START, 'delay'),
  cancelAutoAdvance: actionCreator(types.AUTO_ADVANCE.CANCEL),
  updatePanels: actionCreator(types.PANELS.UPDATE, 'update'),
  showPanel: actionCreator(types.PANELS.SHOW, 'name'),
  hidePanels: actionCreator(types.PANELS.HIDE),
  cycleInfoDetail: actionCreator(types.PANELS.DETAIL.CYCLE),
};

export default actions;
