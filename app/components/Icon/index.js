import React, { PropTypes } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import cuid from 'cuid';
import { ICONS } from './constants';

const Wrapper = styled.span`
  display: inline-block;
  vertical-align: middle;
  align-self: center;
  position: relative;
  width: ${({ iconSize }) => iconSize}; /*CSS instead of html width attr to support non-pixel units*/
  height: ${({ iconSize }) => iconSize}; /*Prevents scaling issue in IE*/
  background-repeat: no-repeat;
  transition: all 200ms ease-in-out;
  color: ${({ iconColor }) => iconColor};
`;

const SVG = styled.svg`
  display: block;
  pointer-events: none;
  transform-origin: 50% 50% 0px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const tooltipDefaults = {
  position: 'right',
  showDelay: 0,
  hideDelay: 0,
};

const Icon = ({ color, size, name, className, tooltip, ...rest }) => {
  // NOTE: <ReactTooltip /> must be present in a parent component (pref root) for tooltips to show!
  const tooltipOptions = Object.assign(
    {},
    tooltipDefaults,
    tooltip,
    { id: cuid() },
  );
  return (
    <Wrapper
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
        {...rest}
      >
        <path d={ICONS[name]} />
      </SVG>
    </Wrapper>
  );
};

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  viewBox: PropTypes.string,
  preserveAspectRatio: PropTypes.string,
  tooltip: PropTypes.shape({
    text: PropTypes.string.isRequired,
    position: PropTypes.string,
    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,
  }),
};

Icon.defaultProps = {
  color: 'currentColor',
  size: '1em',
  viewBox: '0 0 24 24', // polymer default
  preserveAspectRatio: 'xMidYMid meet',
};

export default Icon;
