/**
*
* ReviewInfo
*
*/

import React, { PropTypes } from 'react';

function ReviewInfo({ vocab }) {
  const { readings } = vocab.toJS();
  const content = readings && (
    <div>
      {readings.map((reading, key) =>
        <p key={key}>
          {reading.character} | {reading.kana}
        </p>)
      }
    </div>
  );
  return content || null;
}

ReviewInfo.propTypes = {
  vocab: PropTypes.object,
};

export default ReviewInfo;
