import React from 'react';

import A from 'base/A';

function createPitchText(pitchNum) {
  switch (true) {
    case (pitchNum === 0):
      return 'Pitch starts low, ends high.';
    case (pitchNum === 1):
      return 'Pitch starts high, ends low.';
    case (pitchNum >= 0):
      return `Pitch starts low, stays high for ${pitchNum} mora, ends low.`;
    default:
      return 'No pitch value found, click the number for more info.';
  }
}

function PitchInfo(character, pitchNum, pitchNum2) {
  const renderPitchLink = (pitch) => <A href={`http://www.weblio.jp/content/${character}/`} external>[{pitch}]</A>;
  return (
    <div>
      {createPitchText(pitchNum)}
      {renderPitchLink(pitchNum)}
      {pitchNum2 && (
        <div>or
        {createPitchText(pitchNum2)}
          {renderPitchLink(pitchNum2)}
        </div>
      )}
    </div>
  );
}

export default PitchInfo;
