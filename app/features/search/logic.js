import { createLogic } from "redux-logic";
import { snakeCaseKeys } from "common/utils/caseKeys";

import { selectReviews } from "features/reviews/selectors";
import search from "./actions";
import review from "features/reviews/actions";
import vocab from "features/vocab/actions";
import synonym from "features/synonyms/actions";

export const searchLogic = createLogic({
  type: search.query.request,
  warnTimeout: 10000,
  latest: true,
  processOptions: {
    failType: search.query.failure,
  },

  process({ api, serializers, getState, action: { payload, meta } }, dispatch, done) {
    const { startSubmit, stopSubmit, reset } = meta;
    startSubmit();
    const { serializeVocabSearchResponse, serializeReviews } = serializers;

    api.vocab.search(snakeCaseKeys(payload)).then((res) => {
      const { missingIds, persistedIds } = serializeVocabSearchResponse(
        res,
        selectReviews(getState())
      );
      // FIXME: filter out unviewable reviews, waiting on backend issue #344
      dispatch(
        search.query.success({
          ids: persistedIds,
          isSearching: true,
          isSearchComplete: false,
        })
      );

      Promise.all(missingIds.map((id) => api.review.fetch({ id }))).then(
        (missingReviews) => {
          const updates = serializeReviews(missingReviews);
          dispatch(review.batchUpdate(updates));
          dispatch(vocab.batchUpdate(updates));
          dispatch(synonym.batchUpdate(updates));
          dispatch(
            search.query.success({
              ids: [...persistedIds, ...missingIds],
              isSearching: false,
              isSearchComplete: true,
            })
          );
          stopSubmit();
          reset();
          done();
        }
      );
    });
  },
});

export default [searchLogic];
