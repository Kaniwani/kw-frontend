import React from "react";
import { debounce } from "lodash";

import smoothScrollY from "utils/smoothScrollY";
import ScrollTopButton from "./ScrollTopButton";

class ScrollToTop extends React.Component {
  state = {
    isVisible: false,
    isScrolling: false,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUpdate(prevProps, prevState) {
    if (!prevState.isVisible && prevState.isScrolling) {
      this.setState({ isScrolling: false }); // eslint-disable-line react/no-will-update-set-state
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll = debounce(() => {
    this.setState(() => ({
      // user scrolled greater than 1/3 viewport height
      isVisible: window.pageYOffset > window.innerHeight / 3,
    }));
  }, 100);

  scrollUp = () => {
    if (!this.state.isScrolling) {
      this.setState(() => ({ isScrolling: true }));
      smoothScrollY(0, 2000);
    }
  };

  render() {
    const { isVisible, isScrolling } = this.state;
    return (
      <ScrollTopButton
        onClick={this.scrollUp}
        isVisible={isVisible}
        isScrolling={isScrolling}
      />
    );
  }
}

export default ScrollToTop;
