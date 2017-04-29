import React from 'react';
import PropTypes from 'prop-types';

import * as COLORS from 'shared/styles/colors';
import { Input } from './styles';

class ToggleSwitch extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    handleClick: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    toggleOnColor: PropTypes.oneOf(Object.keys(COLORS)),
    toggleOffColor: PropTypes.oneOf(Object.keys(COLORS)),
  }

  static defaultProps = {
    handleClick: () => {},
    width: '6rem',
    height: '2rem',
    toggleOnColor: 'green',
    toggleOffColor: 'red',
  }

  state = {
    value: this.props.isChecked,
  };

  onClick = () => {
    this.setState((prevState) => ({
      value: !prevState.value,
    }));
    this.props.handleClick(this.state.value);
  }

  render() {
    const { id, name, isChecked, handleClick, ...styleProps } = this.props;
    return (
      <Input
        type="checkbox"
        id={id}
        name={name}
        value={this.state.value}
        onClick={this.onClick}
        {...styleProps}
      />
    );
  }
}

export default ToggleSwitch;
