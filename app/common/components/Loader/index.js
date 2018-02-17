import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isEqual } from 'lodash';
import { IS_PROD_ENV } from 'common/constants';
import Raven from 'common/raven';
import Spinner from 'common/components/Spinner';

import {
  makeSelectDomainShouldLoad,
  makeSelectDomainLastLoad,
  makeSelectDomainIsLoading,
  makeSelectDomainError,
} from 'common/selectors';

class Loader extends React.Component {
  static propTypes = {
    uiDomain: PropTypes.string.isRequired,
    shouldLoad: PropTypes.bool.isRequired,
    lastLoad: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.bool]).isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
    load: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.load();
    }
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  componentDidUpdate() {
    if (this.props.error) {
      console.warn(this.props.error);
      if (IS_PROD_ENV) {
        Raven.captureException(this.props.error);
      }
    }
    if (this.props.shouldLoad) {
      this.props.load();
    }
  }

  render() {
    const { render, ...props } = this.props;
    return render({ ...props, Spinner });
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
