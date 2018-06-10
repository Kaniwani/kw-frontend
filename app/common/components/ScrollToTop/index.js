import React from 'react';
import { debounce } from 'lodash';

import smoothScrollY from 'common/utils/smoothScrollY';
import ScrollTopButton from './ScrollTopButton';

class ScrollToTop extends React.PureComponent {
  state = {
    isVisible: false,
    isScrolling: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = debounce(() => {
    const belowOneThirdViewport = window.pageYOffset > window.innerHeight / 3;
    this.setState((prevState) => ({
      isVisible: belowOneThirdViewport,
      isScrolling: prevState.isScrolling && !belowOneThirdViewport ? false : prevState.isScrolling,
    }));
  }, 100);

  scrollUp = () => {
    if (!this.state.isScrolling) {
      this.setState(() => ({ isScrolling: true }));
      smoothScrollY(0, 2000);
    }
  };

  render() {
    return <ScrollTopButton onClick={this.scrollUp} {...this.state} />;
  }
}

export default ScrollToTop;
