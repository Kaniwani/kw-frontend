import { normalize, denormalize, schema } from 'normalizr';

const readingSchema = new schema.Entity('readings');
const vocabularySchema = new schema.Entity('vocabulary', {
  readings: [readingSchema],
});
const reviewSchema = new schema.Entity('reviews', {
  vocabulary: vocabularySchema,
});

export const normalizeReview = (review) => normalize(review, reviewSchema);
export const denormalizeReview = (review, entities) => denormalize(review, reviewSchema, entities);

export const normalizeReviews = (reviewList) => normalize(reviewList, [reviewSchema]);
export const denormalizeReviews = (reviewList, entities) => denormalize(reviewList, [reviewSchema], entities);

export const normalizeVocabulary = (vocabularyList, level) => ({
  ...normalize(vocabularyList, [vocabularySchema]),
  level,
});
export const denormalizeVocabulary = (vocabularyList, entities) =>
  denormalize(vocabularyList, [vocabularySchema], entities);
