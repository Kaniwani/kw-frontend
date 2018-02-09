import userBody, { userBodyAlternate } from 'common/data/api/user';
import announcementsBody from 'common/data/api/announcements';
import levelsBody from 'common/data/api/levels';
import synonymBody from 'common/data/api/addSynonym';
import lessonsQueueBody from 'common/data/api/lessonsQueue';
import reviewsQueueBody from 'common/data/api/reviewsQueue';
import reviewBody from 'common/data/api/review';
import reviewsBody from 'common/data/api/reviews';
import vocabBody from 'common/data/api/vocab';
import vocabSearchMeaningBody from 'common/data/api/vocabSearchMeaning';
import vocabSearchReadingBody from 'common/data/api/vocabSearchReading';

import {
  serializeUserResponse,
  deserializeUser,
  serializeReviewResponse,
  serializeLevelsResponse,
  serializeQueueResponse,
  serializeLevelResponse,
  serializeVocabSearchResponse,
  serializeAddSynonymResponse,
  serializeAnnouncementsResponse,
  serializeVocab,
} from 'common/serializers';

describe('serializers', () => {
  it('user', () => {
    const serializedUser = serializeUserResponse(userBody);
    const serializedUserAlternate = serializeUserResponse(userBodyAlternate);
    expect(serializedUser).toMatchSnapshot();
    expect(serializedUserAlternate).toMatchSnapshot();
    expect(deserializeUser(serializedUser)).toEqual(userBody);
    expect(deserializeUser(serializedUserAlternate)).toEqual(userBodyAlternate);
  });
  it('levels', () => {
    expect(serializeLevelsResponse(levelsBody)).toMatchSnapshot();
  });
  it('queue', () => {
    expect(serializeQueueResponse(lessonsQueueBody)).toMatchSnapshot();
    expect(serializeQueueResponse(reviewsQueueBody)).toMatchSnapshot();
  });
  it('level', () => {
    expect(serializeLevelResponse(reviewsBody)).toMatchSnapshot();
  });
  it('review', () => {
    expect(serializeReviewResponse(reviewBody)).toMatchSnapshot();
  });
  it('vocab', () => {
    expect(serializeVocab(vocabBody)).toMatchSnapshot();
    expect(serializeVocabSearchResponse(vocabSearchMeaningBody)).toMatchSnapshot();
    expect(serializeVocabSearchResponse(vocabSearchReadingBody)).toMatchSnapshot();
    const persistedReviews = { [vocabSearchReadingBody.results[0].review]: {} };
    expect(
      serializeVocabSearchResponse(vocabSearchReadingBody, persistedReviews)
    ).toMatchSnapshot();
  });
  it('add synonym', () => {
    expect(serializeAddSynonymResponse(synonymBody)).toMatchSnapshot();
  });
  it('announcements', () => {
    expect(serializeAnnouncementsResponse(announcementsBody)).toMatchSnapshot();
  });
});
