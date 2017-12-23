import React from "react";
import PropTypes from "prop-types";

const compose = (...fns) => (...args) => fns.forEach((fn) => fn && fn(...args));

// FIXME: try different controllable implementation https://github.com/NoamELB/make-controllable
// would remove defaultOn
// need to really ensure there are no edge-cases

class Toggle extends React.Component {
  static propTypes = {
    on: PropTypes.bool, // eslint-disable-line react/require-default-props
    defaultOn: PropTypes.bool,
    onToggle: PropTypes.func,
    render: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultOn: false,
    onToggle: () => {},
  };

  state = {
    on: this.props.defaultOn,
  };

  getTogglerProps = ({ onClick, ...props } = {}) => ({
    onClick: compose(onClick, this.toggle),
    "aria-expanded": this.state.on,
    ...props,
  });

  toggle = () => {
    if (this.isOnControlled()) {
      this.props.onToggle(!this.props.on);
    } else {
      this.setState(({ on }) => ({ on: !on }), () => this.props.onToggle(this.state.on));
    }
  };

  isOnControlled() {
    return this.props.on !== undefined;
  }

  render() {
    return this.props.render({
      on: this.isOnControlled() ? this.props.on : this.state.on,
      toggle: this.toggle,
      getTogglerProps: this.getTogglerProps,
    });
  }
}

export default Toggle;
