import { createLogic } from 'redux-logic';
import { snakeCaseKeys } from 'common/utils/caseKeys';

import { selectReviews } from 'features/reviews/selectors';
import { app } from 'common/actions';
import review from 'features/reviews/actions';
import vocab from 'features/vocab/actions';
import search from './actions';

export const searchLogic = createLogic({
  type: search.query.request,
  warnTimeout: 10000,
  latest: true,
  process({ api, serializers, getState, action: { payload, meta } }, dispatch, done) {
    const { form } = meta;
    const { serializeVocabSearchResponse } = serializers;
    form.startSubmit();

    // FIXME: switch to reviews once tadgh implements reading_contains ?

    api.vocab
      .search({ ...snakeCaseKeys(payload), limit: 50 })
      .then((res) => {
        const { missingData, persistedIds, missingIds } = serializeVocabSearchResponse(
          res,
          selectReviews(getState())
        );

        dispatch(review.batchUpdate(missingData));
        dispatch(vocab.batchUpdate(missingData));
        dispatch(
          search.query.success({
            ids: [...persistedIds, ...missingIds],
            isSearching: false,
            isSearchComplete: true,
          })
        );

        form.stopSubmit();
        form.reset();
        form.blur();
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, payload));
        done();
      });
  },
});

export default [searchLogic];
