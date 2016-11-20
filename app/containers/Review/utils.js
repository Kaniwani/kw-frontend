/**
 * Modifies review data loaded from server to preferred js name formats and shape
 * @param  {object} data Review data server result
 * @return {object} Modified review data
 */
export function shapeReviewData(data) {
  const shapedReviews = data.results.map((item) => {
    const shapedItem = {
      id: item.id,
      vocabulary: item.vocabulary,
      // correct: item.correct,
      // incorrect: item.incorrect,
      streak: item.streak,
      session: {
        correct: 0,
        incorrect: 0,
        ignored: 0,
      },
    };

    return shapedItem;
  });

  return { count: data.count, reviews: shapedReviews };
}
