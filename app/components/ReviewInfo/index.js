/**
*
* ReviewInfo
*
*/

import React, { PropTypes } from 'react';

function ReviewInfo({ vocab }) {
  const { readings } = vocab.toJS();
  return (
    <div>
      {readings && readings.map((reading, index) => (
        <p key={index}>{reading.character} | {reading.kana}</p>
      ))}
    </div>
  );
}

ReviewInfo.propTypes = {
  vocab: PropTypes.object,
};

export default ReviewInfo;
