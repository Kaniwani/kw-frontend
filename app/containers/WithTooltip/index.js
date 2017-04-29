import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import defaultProps from 'recompose/defaultProps';

// https://www.npmjs.com/package/react-tooltip

const WithTooltip = compose(
  setPropTypes({
    'data-tip': PropTypes.string.isRequired, // tooltip content
    'data-for': PropTypes.string, // corresponds to id of external/parent <ReactToolTip />
    'data-place': PropTypes.string, // tooltip position
    'data-type': PropTypes.string, // dark, success, warning, error, info, light (theming)
    'data-multiline': PropTypes.bool, // supports <br /> in data-tip
    'data-delay-show': PropTypes.number, // milliseconds
    'data-delay-hide': PropTypes.number, // milliseconds
  }),
  defaultProps({
    'data-for': 'globalTooltip',
  }),
);

export default WithTooltip;
