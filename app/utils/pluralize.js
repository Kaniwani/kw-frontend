/**
 * Add 's' to text if number is zero or plural
 */
function pluralize(text, num) {
  const number = parseInt(num, 10);

  if (Number.isNaN(number)) {
    console.warn('pluralize received non-number'); // eslint-disable-line no-console
  }

  return `${number} ${text + (number > 1 || number === 0 ? 's' : '')}`;
}

export default pluralize;
