/**
 * Modifies user data loaded from server to preferred js name formats and shape
 * @param  {object} data User data server result
 * @return {object} Modified user data
 */
export default function shapeUserData(data) { // eslint-disable-line import/prefer-default-export
  const shapedData = {
    name: data.name,
    reviewCount: data.reviews_count,
    apiKey: data.api_key,
    apiValid: data.api_valid,
    joinDate: new Date(data.join_date),
    lastWkSyncDate: (data.last_wanikani_sync_date != null) ? new Date(data.last_wanikani_sync_date) : null,
    lastKwSyncDate: new Date(),
    level: data.level,
    unlockedLevels: data.unlocked_levels,
    settings: {
      followMe: data.follow_me,
      autoAdvanceCorrect: data.auto_advance_on_success,
      autoExpandCorrect: data.auto_expand_answer_on_success,
      autoExpandIncorrect: data.auto_expand_answer_on_failure,
      burnedOnly: data.only_review_burned,
      onVacation: data.on_vacation,
      vacationDate: (data.vacation_date != null) ? new Date(data.vacation_date) : null,
    },
  };
  return shapedData;
}
