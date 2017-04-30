import React from 'react';
import debounce from 'lodash/debounce';

import smoothScrollY from 'utils/smoothScrollY';
import ScrollTopButton from 'components/ScrollTopButton';

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
    return (
      <ScrollTopButton
        onClick={this.scrollUp}
        isVisible={this.state.isVisible}
        isScrolling={this.state.isScrolling}
      />
    );
  }
}

export default ScrollToTop;
