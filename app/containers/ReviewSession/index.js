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
 selectLoading,
 selectError,
} from 'containers/ReviewPage/selectors';

import {
  selectCurrentMeaning,
} from './selectors';

import {
  setNewCurrent,
} from './actions';


const Wrapper = styled.section`
  display: table;
  padding: 0;
  width: 100%;
  height: 100vh;
`;

export class Review extends React.PureComponent {
  componentWillReceiveProps({ loading, error, meaning }) {
    if (!loading && !error && !meaning) {
      this.props.setNewCurrent();
    }
  }

  render() {
    const { loading, error, meaning } = this.props;

    return (
      <Wrapper>
        <Helmet
          title="Review Session"
          meta={[
            { name: 'description', content: 'Kaniwani Review Session' },
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
  setNewCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  meaning: selectCurrentMeaning(),
});

function mapDispatchToProps(dispatch) {
  return {
    setNewCurrent: () => dispatch(setNewCurrent()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
