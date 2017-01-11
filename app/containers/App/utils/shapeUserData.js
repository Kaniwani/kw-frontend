/**
 * Modifies user data loaded from server to preferred js name formats and shape
 * @param  {object} data User data server result
 * @return {object} Modified user data
 */
export default function shapeUserData(data) { // eslint-disable-line import/prefer-default-export
  const shapedData = {
    name: data.profile.name,
    email: data.email, // kw
    userId: data.id,
    lastLogin: new Date(data.last_login),
    joinDate: new Date(data.date_joined),
    isActive: data.is_active,
    reviewCount: data.profile.reviews_count,
    apiKey: data.profile.api_key,
    apiValid: data.profile.api_valid,
    lastWkSyncDate: (data.profile.last_wanikani_sync_date != null) ? new Date(data.profile.last_wanikani_sync_date) : null,
    lastKwSyncDate: new Date(),
    level: data.profile.level,
    unlockedLevels: data.profile.unlocked_levels,
    settings: {
      followMe: data.profile.follow_me,
      autoAdvanceCorrect: data.profile.auto_advance_on_success,
      autoAdvanceDelay: 3000,
      autoExpandCorrect: data.profile.auto_expand_answer_on_success,
      autoExpandIncorrect: data.profile.auto_expand_answer_on_failure,
      burnedOnly: data.profile.only_review_burned,
      onVacation: data.profile.on_vacation,
      vacationDate: (data.profile.vacation_date != null) ? new Date(data.profile.vacation_date) : null,
    },
  };
  return shapedData;
}
