import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { LOCATION_CHANGE, routerReducer } from 'react-router-redux';
import { persistReducer, persistUiReducer } from 'common/persistence';

import { app } from 'common/actions';

import { announcementsUiReducer, announcementsReducer } from 'features/announcements/reducer';
import { userUiReducer, userReducer } from 'features/user/reducer';
import { vocabReducer } from 'features/vocab/reducer';
import { vocabLevelsUiReducer, vocabLevelsReducer } from 'features/vocab/Levels/reducer';
import { vocabLevelUiReducer } from 'features/vocab/Level/reducer';
import { reviewsReducer } from 'features/reviews/reducer';
import { synonymsUiReducer, synonymsReducer } from 'features/synonyms/reducer';
import { searchReducer } from 'features/search/reducer';
import { quizSessionReducer } from 'features/quiz/QuizSession/reducer';
import { quizAnswerReducer } from 'features/quiz/QuizSession/QuizAnswer/reducer';
import { quizInfoReducer } from 'features/quiz/QuizSession/QuizInfo/reducer';
import { quizSummaryReducer } from 'features/quiz/QuizSummary/reducer';

const entitiesReducer = combineReducers({
  user: userReducer,
  vocab: vocabReducer,
  levels: vocabLevelsReducer,
  reviews: reviewsReducer,
  synonyms: synonymsReducer,
  announcements: announcementsReducer,
});

// FIXME: create appReducer? globalReducer? reducerReducers with routerReducer?
import { handleActions } from 'redux-actions';
let fromPath = '';
const globalInitialState = { maintenance: { active: false }, fromPath: '' };
export const appReducer = handleActions(
  {
    [app.maintenanceMode]: (state, action) => ({
      ...state,
      maintenance: { active: action.payload },
    }),
    [LOCATION_CHANGE]: (state, action) => {
      const prevPath = fromPath;
      fromPath = action.payload.pathname;
      return { ...state, fromPath: prevPath };
    },
  },
  globalInitialState
);

const rootReducer = combineReducers({
  app: appReducer,
  search: searchReducer,
  user: persistUiReducer('user', userUiReducer),
  announcements: persistUiReducer('announcements', announcementsUiReducer),
  levels: persistUiReducer('levels', vocabLevelsUiReducer),
  level: persistUiReducer('level', vocabLevelUiReducer),
  synonyms: synonymsUiReducer,
  quizSession: quizSessionReducer,
  quizSummary: persistReducer({ key: 'quizSummary' }, quizSummaryReducer),
  quizAnswer: quizAnswerReducer,
  quizInfo: quizInfoReducer,
  form: formReducer,
  router: routerReducer,
  entities: persistReducer({ key: 'entities' }, entitiesReducer),
});

export default rootReducer;
