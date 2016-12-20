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
  selectCurrentVocab,
} from './selectors';

const Wrapper = styled.section`
  display: table;
  padding: 0;
  width: 100%;
  height: 100vh;
`;

export function ReviewSession({ loading, error, vocab }) {
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
        meaning={vocab.get('meaning')}
      />
      <ReviewAnswer />
      <ReviewInfo readings={vocab.get('readings')} />
    </Wrapper>
  );
}

ReviewSession.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  vocab: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  vocab: selectCurrentVocab(),
});

export default connect(mapStateToProps)(ReviewSession);
