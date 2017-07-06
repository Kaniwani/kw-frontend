import { normalize, denormalize, schema } from 'normalizr';

const readingSchema = new schema.Entity('readings');
const vocabularySchema = new schema.Entity('vocabulary', {
  readings: [readingSchema],
});
const reviewSchema = new schema.Entity('reviews', {
  vocabulary: vocabularySchema,
});

const levelSchema = new schema.Entity('levels', {
  reviews: [reviewSchema],
});
const levelReviewsSchema = [levelSchema];

export const normalizeLevels = (levels) => normalize(levels, [levelSchema]);
export const denormalizeLevels = (levels, entities) => denormalize(levels, [levelSchema], entities);

export const normalizeReviews = (reviews) => normalize(reviews, [reviewSchema]);
export const denormalizeReviews = (reviews, entities) => denormalize(reviews, [reviewSchema], entities);

export const normalizeReview = (review) => normalize(review, reviewSchema);
export const denormalizeReview = (review, entities) => denormalize(review, reviewSchema, entities);

export const normalizeLevelReviews = (id, reviews) => normalize([{ id, reviews }], levelReviewsSchema);
export const denormalizeLevelReviews = (level, entities) => normalize([level], levelReviewsSchema, entities);
