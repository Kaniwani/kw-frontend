import React, { PropTypes } from 'react';

// TODO: kaniwani styling
function ReviewInfo({ vocab, isVisible }) {
  if (!isVisible) return (<div />);
  const { readings } = vocab.toJS();
  return (
    readings ?
      <div>
        {readings.map((reading, index) => (
          <p key={index}>{reading.character} | {reading.kana}</p>
        ))}
      </div>
    : null
  );
}

ReviewInfo.propTypes = {
  vocab: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default ReviewInfo;
