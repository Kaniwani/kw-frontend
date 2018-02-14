import React from 'react';
import PropTypes from 'prop-types';

import { debounce } from 'lodash';
import { breakpoints } from 'common/styles/media';
import { RouterLink, Svg } from './styles';

export const LOGO_LARGE_REMS = '4.25rem';
export const LOGO_SMALL_REMS = '3.25rem';

class LogoLink extends React.Component {
  static propTypes = {
    to: PropTypes.string,
    size: PropTypes.string,
  };

  static defaultProps = {
    to: '/',
    size: '',
  };

  state = {};

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  getSize = () =>
    this.props.size || window.innerWidth > breakpoints.md ? LOGO_LARGE_REMS : LOGO_SMALL_REMS;

  handleResize = debounce(() => {
    this.setState({ size: this.getSize() });
  }, 300);

  render() {
    return (
      <RouterLink to={this.props.to} size={this.state.size} title="Return Home">
        <Svg width="100%" height="100%" />
      </RouterLink>
    );
  }
}

export default LogoLink;
