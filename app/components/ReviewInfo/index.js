/**
*
* ReviewInfo
*
*/

import React, { PropTypes } from 'react';

function ReviewInfo({ vocab, visible }) {
  const { readings } = vocab.toJS();
  if (!visible) return (<div />);
  return (
    <div>
      {readings && readings.map((reading, index) => (
        <p key={index}>{reading.character} | {reading.kana}</p>
      ))}
    </div>
  );
}

ReviewInfo.propTypes = {
  vocab: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default ReviewInfo;
