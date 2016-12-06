/**
*
* ReviewInfo
*
*/

import React, { PropTypes } from 'react';


// TODO: kaniwani styling
function ReviewInfo({ vocab, visible }) {
  if (!visible) return (<div />);
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
  vocab: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default ReviewInfo;
