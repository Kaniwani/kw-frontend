import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledImg = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;

Img.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Img.defaultProps = {
  className: '',
};

function Img(props) {
  return (
    <StyledImg className={props.className} src={props.src} alt={props.alt} />
  );
}

export default Img;
