import React from 'react';
import PropTypes from 'prop-types';

import { StyledElement } from './styles';

Element.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  flex: PropTypes.string,
  flexCenter: PropTypes.bool,
  flexColumn: PropTypes.bool,
  flexDisplay: PropTypes.string,
  flexRow: PropTypes.bool,
  flexWrap: PropTypes.bool,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  alignContent: PropTypes.string,
  alignSelf: PropTypes.string,
  fullRow: PropTypes.bool,
  textAlign: PropTypes.string,
};

Element.defaultProps = {
  flex: '',
  flexCenter: false,
  flexColumn: false,
  flexDisplay: '', // defaults to 'flex', alternative is to pass 'inline-flex'
  flexRow: false,
  flexWrap: false,
  justifyContent: 'inherit',
  alignItems: 'inherit',
  alignContent: 'inherit',
  alignSelf: '',
  fullRow: false,
  textAlign: '',
};

function Element({ children, ...props }) {
  return (
    <StyledElement {...props}>
      {children}
    </StyledElement>
  );
}

export default Element;
