/**
 * Creates a randomised hex color string
 * @return {String} hex color
 * @example
 * randomHexColor()
 * // => '#ed6ae7'
 */
const randomHexColor = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`; // eslint-disable-line no-bitwise

export default randomHexColor;
