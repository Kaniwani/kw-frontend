export function shapeUserData(data) {
  const shapedData = {
    name: data.name,
    reviewsCount: data.review_count,
    apiKey: data.api_key,
    apiValid: data.api_valid,
    joinDate: new Date(data.join_date),
    lastWkSyncDate: (data.last_wanikani_sync_date != null) ? new Date(data.last_wanikani_sync_date) : null,
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
