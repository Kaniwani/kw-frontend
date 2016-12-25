import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Img from 'components/Img';
import Logo from 'shared/assets/img/logo.png';

const StyledLink = styled(Link)`
  display: block;
  width: ${(props) => props.size};
  height: auto;
`;

const StyledImg = styled(Img)`
  display: block;
  max-width: 100%;
`;


// FIXME: svg using <Icon /> with hover fill color change
const LogoLink = ({ urlPath, size }) => (
  <StyledLink to={urlPath} size={size}>
    <StyledImg src={Logo} alt="kaniwani - Logo" />
  </StyledLink>
);

LogoLink.propTypes = {
  urlPath: PropTypes.string,
  size: PropTypes.string,
};

LogoLink.defaultProps = {
  urlPath: '/',
  size: '1em',
};

export default LogoLink;
