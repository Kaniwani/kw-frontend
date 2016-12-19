import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import ReviewHeader from 'containers/ReviewHeader';
import ReviewAnswer from 'containers/ReviewAnswer';
import ReviewInfo from 'containers/ReviewInfo';
import ReviewQuestion from 'components/ReviewQuestion';

import {
  loadReviewData,
  setNewCurrent,
} from './actions';

import {
 selectLoading,
 selectError,
 selectCurrentMeaning,
} from './selectors';

const Wrapper = styled.section`
  display: table;
  padding: 0;
  width: 100%;
  height: 100vh;
`;

export class Review extends React.PureComponent {
  componentWillMount() {
    if (!this.props.meaning) this.props.loadReviewData();
  }

  componentWillReceiveProps({ loading, meaning }) {
    if (!loading && !meaning) {
      this.props.setNewCurrent();
    }
  }

  render() {
    const { loading, error, meaning } = this.props;

    return (
      <Wrapper>
        <Helmet
          title="Review"
          meta={[
            { name: 'description', content: 'Kaniwani Reviews Page' },
          ]}
        />
        <ReviewHeader />
        <ReviewQuestion
          loading={loading}
          error={error}
          meaning={meaning}
        />
        <ReviewAnswer />
        <ReviewInfo />
      </Wrapper>
    );
  }
}

Review.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  meaning: PropTypes.string.isRequired,
  loadReviewData: PropTypes.func.isRequired,
  setNewCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  meaning: selectCurrentMeaning(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadReviewData: () => dispatch(loadReviewData()),
    setNewCurrent: () => dispatch(setNewCurrent()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);