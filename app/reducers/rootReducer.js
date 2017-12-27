import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { persistReducer, persistUiReducer } from 'common/persistence';
import { reduceReducers, createConditionalSliceReducer } from 'reducers/utils';

import { announcementsUiReducer, announcementsReducer } from 'features/announcements/reducer';
import { userUiReducer, userReducer } from 'features/user/reducer';
import { vocabReducer } from 'features/vocab/reducer';
import { vocabLevelsUiReducer, vocabLevelsReducer } from 'features/vocab/Levels/reducer';
import { vocabLevelUiReducer } from 'features/vocab/Level/reducer';
import { reviewsReducer } from 'features/reviews/reducer';
import { synonymsReducer } from 'features/synonyms/reducer';
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

const combinedReducer = combineReducers({
  user: persistUiReducer('user', userUiReducer),
  search: searchReducer,
  announcements: persistUiReducer('announcements', announcementsUiReducer),
  levels: persistUiReducer('levels', vocabLevelsUiReducer),
  level: persistUiReducer('level', vocabLevelUiReducer),
  quizSession: quizSessionReducer,
  quizSummary: persistReducer({ key: 'quizSummary' }, quizSummaryReducer),
  quizAnswer: quizAnswerReducer,
  quizInfo: quizInfoReducer,
  form: formReducer,
  router: routerReducer,
  entities: persistReducer({ key: 'entities' }, entitiesReducer),
});

const rootReducer = (state, action) => combinedReducer(state, action);
// return reduceReducers(
// combinedReducer,
// createConditionalSliceReducer('entities', entitiesCrudReducer)
// )(state, action);

export default rootReducer;
