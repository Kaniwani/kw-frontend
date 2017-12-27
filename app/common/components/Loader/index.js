import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from 'common/components/Spinner';

import {
  makeSelectDomainShouldLoad,
  makeSelectDomainLastLoad,
  makeSelectDomainIsLoading,
  makeSelectDomainError,
} from "common/selectors";

class Loader extends React.Component {
  static propTypes = {
    uiDomain: PropTypes.string.isRequired,
    shouldLoad: PropTypes.bool.isRequired,
    lastLoad: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.bool])
      .isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
    load: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
  };

  // TODO: make an error portal/notification (or a HoC to wrap Loader/other comps in)
  static renderError({ status, response, ...rest }) {
    return (
      <div>
        <h2>A Wild Error has Appeared!</h2>
        {(status || response) && <h3>{JSON.stringify({ status, response })}</h3>}
        <p>{JSON.stringify(rest)}</p>
      </div>
    );
  }

  state = {
    error: false,
  };

  componentDidMount() {
    console.log(this.props.uiDomain, "Loader mount. shouldLoad =", this.props.shouldLoad);
    if (this.props.shouldLoad) {
      this.props.load();
    }
  }

  componentDidUpdate() {
    console.log(this.props.uiDomain, "Loader update. shouldLoad =", this.props.shouldLoad);
    if (this.props.shouldLoad) {
      this.props.load();
    }
  }

  componentDidCatch(error, info) {
    console.group("ComponentDidCatch");
    console.error(error);
    console.log(info);
    console.groupEnd("ComponentDidCatch");
    // TODO: log errors to slack
    // https://sentry.io/for/open-source/
    this.setState((prevState) => ({
      ...prevState,
      error: { error, info },
    }));
  }

  render() {
    const { render, error, ...props } = this.props;
    return error || this.state.error
      ? Loader.renderError(error)
      : this.props.render({ ...props, Spinner });
  }
}

const mapStateToProps = (_, initialProps) => {
  const {
    selectShouldLoad = makeSelectDomainShouldLoad(initialProps.uiDomain),
    selectLastLoad = makeSelectDomainLastLoad(initialProps.uiDomain),
    selectIsLoading = makeSelectDomainIsLoading(initialProps.uiDomain),
    selectError = makeSelectDomainError(initialProps.uiDomain),
  } = initialProps;

  return (state, props) => ({
    shouldLoad: selectShouldLoad(state, props),
    lastLoad: selectLastLoad(state, props),
    isLoading: selectIsLoading(state, props),
    error: selectError(state, props),
  });
};

const mapDispatchToProps = (dispatch, { load, ...props }) => ({
  load: () => dispatch(load(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
