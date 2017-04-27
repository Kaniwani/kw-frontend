import React from 'react';
import PropTypes from 'prop-types';

import { Div } from './styles';

/**
 * Requires a parent with position: relative, and a valid height or min-height
 * This component renders a div with position: absolute, height/width 100%
 * expecting to fill its parent's container
 */

BackgroundImg.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  bgSize: PropTypes.string,
  bgPosition: PropTypes.string,
};

BackgroundImg.defaultProps = {
  bgSize: 'cover',
  bgPosition: 'center center',
};

function BackgroundImg({ imgSrc, bgSize, bgPosition }) {
  return (
    <Div imgSrc={imgSrc} bgSize={bgSize} bgPosition={bgPosition} />
  );
}

export default BackgroundImg;
