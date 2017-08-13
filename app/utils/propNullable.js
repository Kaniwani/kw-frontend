/**
 * Usage:
 *
 * import nullable from 'propNullable';
 *
 * Component.propTypes = {
 *   myProp: nullable( React.PropTypes.string ).isRequired,
 *   myOtherProp: nullable( [React.PropTypes.string, React.PropTypes.number] )
 * };
 *
 */
import { oneOf, oneOfType } from 'prop-types';

export default (types) => oneOfType([oneOf([null]), ...[].concat(types)]);
