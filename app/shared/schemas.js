import { normalize, denormalize, schema } from 'normalizr';

const readingSchema = new schema.Entity('readings');
const vocabularySchema = new schema.Entity('vocabulary', {
  readings: [readingSchema],
});
const reviewSchema = new schema.Entity('reviews', {
  vocabulary: vocabularySchema,
});

export function normalizeReviews(reviewList) {
  const { entities, result: queue } = normalize(reviewList, [reviewSchema]);
  return { entities, queue };
}

export function normalizeLevel(vocabularyList) {
  const resulte = normalize(vocabularyList, [vocabularySchema]);
  console.log(resulte);
  return resulte;
}

export function denormalizeReview(review, entities) {
  return denormalize(review, reviewSchema, entities);
}
