import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import cuid from 'cuid';
import InfoPanel from './InfoPanel';
import { Wrapper } from './UI';

export const ReviewInfo = ({ readings, fullDetails }) => (
  <Wrapper>
    <InfoPanel fullDetails={fullDetails} key={cuid()} item={readings.first()} category="Main" />
    {readings.slice(1).map((reading) => <InfoPanel fullDetails={fullDetails} key={cuid()} item={reading} category="Synonym" />)}
  </Wrapper>
  );

ReviewInfo.propTypes = {
  readings: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  fullDetails: PropTypes.bool.isRequired,
};

export default ReviewInfo;
