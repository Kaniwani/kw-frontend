import React from 'react';
import PropTypes from 'prop-types';

import { StyledElement } from './styles';

Element.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  alignContent: PropTypes.string,
  alignItems: PropTypes.string,
  alignSelf: PropTypes.string,
  flex: PropTypes.string,
  flexCenter: PropTypes.bool,
  flexCol: PropTypes.bool,
  flexDisplay: PropTypes.string,
  flexRow: PropTypes.bool,
  flexWrap: PropTypes.bool,
  fullRow: PropTypes.bool,
  justifyContent: PropTypes.string,
  textAlign: PropTypes.string,
};

Element.defaultProps = {
  tag: 'div',
  alignContent: '',
  alignItems: '',
  alignSelf: '',
  flex: '',
  flexCenter: false,
  flexCol: false,
  flexDisplay: '', // defaults to 'flex', alternative is to pass 'inline-flex'
  flexRow: false,
  flexWrap: false,
  fullRow: false,
  justifyContent: '',
  textAlign: '',
};

function Element({ tag, children, ...props }) {
  return (
    <StyledElement tag={tag} {...props}>
      {children}
    </StyledElement>
  );
}

export default Element;
