import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { white } from 'shared/styles/colors';
import ReviewHeader from 'containers/ReviewHeader';
import ReviewAnswer from 'containers/ReviewAnswer';
import ReviewInfo from 'containers/ReviewInfo';
import ReviewQuestion from 'components/ReviewQuestion';
import ReviewBackground from 'containers/ReviewInfo/ReviewBackground'; // TODO: relocate

import {
 selectLoading,
 selectError,
} from 'containers/ReviewPage/selectors';

import {
  selectInfoVisible,
} from 'containers/ReviewInfo/selectors';

import {
  selectCurrentMeaning,
  selectCurrentReadings,
} from './selectors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #e5e5e5; /* image bg color, not used anywhere else hence no imported var name */
`;

const Upper = styled.section`
  display: flex;
  flex-direction: column;
  padding: .5rem;
  background-color: #6a3bbc;
  background-image: linear-gradient(180deg, #774ac6, #5f35a9);
  background-repeat: repeat-x;
  color: rgb(${white});
`;

export function ReviewSession({ loading, error, isInfoVisible, meaning, readings }) {
  return (
    <Wrapper>
      <Helmet
        title="Review Session"
        meta={[
          { name: 'description', content: 'Kaniwani Review Session' },
        ]}
      />
      <Upper>
        <ReviewHeader />
        <ReviewQuestion
          loading={loading}
          error={error}
          meaning={meaning}
          tags={readings.getIn([0, 'tags'])}
        />
      </Upper>
      <ReviewAnswer />
      {isInfoVisible && <ReviewInfo readings={readings} />}
      <ReviewBackground />
    </Wrapper>
  );
}

ReviewSession.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  isInfoVisible: PropTypes.bool.isRequired,
  meaning: PropTypes.string.isRequired,
  readings: PropTypes.instanceOf(Immutable.Iterable).isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  isInfoVisible: selectInfoVisible(),
  meaning: selectCurrentMeaning(),
  readings: selectCurrentReadings(),
});

export default connect(mapStateToProps)(ReviewSession);
