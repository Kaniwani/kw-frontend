import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Requires a parent with position: relative
 */

const StyledDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ imgSrc }) => imgSrc});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: cover;
  z-index: -1;
  /* If parent is a flex container */
  flex: 1 1 100%;
  align-self: stretch;
`;

BackgroundImg.propTypes = {
  imgSrc: PropTypes.string.isRequired,
};

function BackgroundImg({ imgSrc }) {
  return (
    <StyledDiv imgSrc={imgSrc} />
  );
}

export default BackgroundImg;
