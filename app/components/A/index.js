import React, { PropTypes } from 'react';
import styled, { css } from 'styled-components';
import { link, linkHover } from 'shared/styles/colors';

const plainStyles = css`
  text-decoration: none;
`;

const linkStyles = css`
  transition: all .3s ease-out;
  color: rgb(${link});
  &:hover {
    color: rgb(${linkHover});
  }
`;

const StyledAnchor = styled.a`
  ${(props) => props.plainLink ? plainStyles : linkStyles}
`;

const A = ({ href, children, external, ...props }) => {
  const externalProps = external ? {} : {
    rel: 'external noopener noreferrer',
    target: '_blank',
  };
  return (
    <StyledAnchor href={href} {...externalProps} {...props} >
      {children}
    </StyledAnchor>
  );
};

A.propTypes = {
  href: PropTypes.string.isRequired,
  external: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
};

A.defaultProps = {

};

export default A;
