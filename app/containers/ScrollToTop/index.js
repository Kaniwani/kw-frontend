import React from 'react';
import debounce from 'lodash/debounce';

import smoothScrollY from 'utils/smoothScrollY';
import Icon from 'components/Icon';
import { ScrollButton } from './styles';

class ScrollToTop extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    isVisible: false,
    isScrolling: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUpdate(prevProps, prevState) {
    if (!prevState.isVisible) {
      this.setState({ isScrolling: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = debounce(() => {
    this.setState(() => ({
      // user scrolled greater than 1/3 viewport height
      isVisible: window.pageYOffset > (window.innerHeight / 3),
    }));
  }, 250)

  scrollUp = () => {
    if (!this.state.isScrolling) {
      this.setState(() => ({ isScrolling: true }));
      smoothScrollY(0, 2000);
    }
  }

  render() {
    let classNames = [];
    if (this.state.isVisible) classNames.push('isVisible');
    if (this.state.isScrolling) classNames.push('isScrolling');
    classNames = classNames.join(' ');

    return (
      <ScrollButton
        type="button"
        className={classNames}
        onClick={this.scrollUp}
      >
        <Icon name="ARROW_UP" size="2.5rem" color="white" />
      </ScrollButton>
    );
  }
}

export default ScrollToTop;
