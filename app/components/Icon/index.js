import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import cuid from 'cuid';

import ICONS from './constants';
import { SVGWrapper, SVG } from './styles';

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  preserveAspectRatio: PropTypes.string,
  tooltip: PropTypes.shape({
    text: PropTypes.string.isRequired,
    position: PropTypes.string,
    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,
  }),
  inline: PropTypes.bool,
};

Icon.defaultProps = {
  className: '',
  tooltip: { text: '' },
  color: 'currentColor',
  size: '1em',
  preserveAspectRatio: 'xMidYMid meet',
  inline: true,
};

const tooltipDefaults = {
  position: 'right',
  showDelay: 0,
  hideDelay: 0,
};

// TODO: create HoC as "withTooltip" to simplify this icon component
function Icon({ color, size, name, className, tooltip, inline, ...rest }) {
  // NOTE: <ReactTooltip /> must be present in a parent component (pref root) for tooltips to show!
  const tooltipOptions = Object.assign(
    {},
    tooltipDefaults,
    tooltip,
    { id: cuid() },
  );

  return (
    <SVGWrapper
      inline={inline}
      className={className}
      iconColor={color}
      iconSize={size}
      data-tip={tooltipOptions.text}
      data-for={tooltipOptions.id}
      data-place={tooltipOptions.position}
      data-delay-show={tooltipOptions.showDelay}
      data-delay-hide={tooltipOptions.hideDelay}
    >
      { tooltipOptions.text && <ReactTooltip id={tooltipOptions.id} /> }
      <SVG
        title={name}
        width="100%"
        height="100%"
        viewBox={ICONS[name].viewBox}
        {...rest}
      >
        {ICONS[name].path}
      </SVG>
    </SVGWrapper>
  );
}

export default Icon;
