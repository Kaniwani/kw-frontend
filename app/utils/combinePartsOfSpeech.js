/**
 * Add 'common' to tags list
 * @param  {Array} tags List of parts of speech strings
 * @param  {Boolean} common is this a common word
 * @return {Array} combined tags
 */
const combinePartsOfSpeech = ({ tags = [], common = false } = {}) => {
  return common ? ['common', ...tags] : tags;
};

export default combinePartsOfSpeech;
