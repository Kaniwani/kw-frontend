/**
 * Add 'Common'|'Uncommon' and JLPT rank to tags list
 * @param  {Array} tags List of parts of speech strings
 * @param  {String|null} jlpt jlpt rank or null
 * @param  {Boolean} common is this a common word
 * @return {Array} combined tags
 */
const combinePartsOfSpeech = ({ tags = [], jlpt = null, common = false } = {}) => {
  const newTags = [common ? 'Common' : 'Uncommon', ...tags];
  return jlpt != null ? [jlpt, ...newTags] : newTags;
};

export default combinePartsOfSpeech;
