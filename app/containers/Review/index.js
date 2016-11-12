/*
 *
 * Review
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectReview from './selectors';

export class Review extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        I’m the Review page!
      </div>
    );
  }
}

const mapStateToProps = selectReview();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
