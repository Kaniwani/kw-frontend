import { handleActions, combineActions } from "redux-actions";
import update from "immutability-helper";
import { merge } from "lodash";

import synonym from "features/synonyms/actions";
import vocab from "features/vocab/actions";
import review from "features/reviews/actions";
import user from "features/user/actions";
import quiz from "features/quiz/actions";

export const initialSynonymsEntitiesState = {};

const ingestSynonyms = (state, { payload }) => merge({}, state, payload.synonymsById);

const createSynonym = (state, { payload }) => merge({}, state, { [payload.id]: payload });

const deleteSynonym = (state, { payload }) => update(state, { $unset: [payload.id] });

export const synonymsReducer = handleActions(
  {
    [combineActions(
      vocab.level.load.success,
      quiz.session.queue.load.success,
      review.load.success,
      synonym.batchUpdate
    )]: ingestSynonyms,
    [synonym.add.success]: createSynonym,
    [synonym.remove.success]: deleteSynonym,
    [user.logout]: () => initialSynonymsEntitiesState,
  },
  initialSynonymsEntitiesState
);

export default synonymsReducer;
