import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from 'common/components/IconButton';

// prettier-ignore
const Toggle = styled(IconButton)` margin: 0 !important;`;

const Hamburger = ({ size, title, onToggle }) => (
  <Toggle name="MENU" title={title} onClick={onToggle} size={size} />
);

Hamburger.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
};

Hamburger.defaultProps = {
  title: 'Toggle Menu',
  size: '2.5em',
};

export default Hamburger;
