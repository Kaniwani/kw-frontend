/**
 * Creates a randomised hex color string
 * @return {String} hex color
 * @example
 * randomHexColor()
 * // => '#ed6ae7'
 */
const randomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export default randomHexColor;
