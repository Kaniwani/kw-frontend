import React from 'react';
import PropTypes from 'prop-types';

import * as COLORS from 'shared/styles/colors';
import { Input } from './styles';

class ToggleSwitch extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    toggleOnColor: PropTypes.oneOf(Object.keys(COLORS)),
    toggleOffColor: PropTypes.oneOf(Object.keys(COLORS)),
  }

  static defaultProps = {
    width: '6rem',
    height: '2rem',
    toggleOnColor: 'green',
    toggleOffColor: 'red',
  }

  state = {
    checked: this.props.isChecked,
  }

  onChange = () => {
    this.setState((prevState) => ({ checked: !prevState.checked }));
    this.props.handleChange(this.state.checked);
  }

  render() {
    const { id, name, isChecked, handleChange, ...styleProps } = this.props;
    return (
      <Input
        type="checkbox"
        id={id}
        name={name}
        checked={this.state.checked}
        onChange={this.onChange}
        {...styleProps}
      />
    );
  }
}

export default ToggleSwitch;
