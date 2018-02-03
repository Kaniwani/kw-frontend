import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, Dot } from 'recharts';

import { getMorae, getMoraCount, getPitchPatternName, makePitchPattern } from './utils';
import { Wrapper } from './styles';

PitchDiagram.propTypes = {
  reading: PropTypes.string,
  pitchNum: PropTypes.number,
  showMora: PropTypes.bool,
  showLabel: PropTypes.bool,
  colors: PropTypes.shape({
    heiban: PropTypes.string,
    odaka: PropTypes.string,
    nakadaka: PropTypes.string,
    atamadaka: PropTypes.string,
    unknown: PropTypes.string,
  }),
};

PitchDiagram.defaultProps = {
  reading: '',
  pitchNum: -1,
  showMora: true,
  showLabel: false,
  colors: {
    heiban: '#d20ca3',
    odaka: '#0cd24d',
    nakadaka: '#27a2ff',
    atamadaka: '#ea9316',
    unknown: '#cccccc',
  },
};

const placeholder = '（ツ）';
// prettier-ignore
const placeholderMora = ['', '', '', placeholder, '', '', ''];

// prettier-ignore
const placeholderData = [
  { name: '', pitchHeight: 1 },
  { name: '', pitchHeight: 1 },
  { name: '', pitchHeight: 0 },
  { name: '', pitchHeight: 0 },
  { name: '', pitchHeight: 0 },
  { name: '', pitchHeight: 1 },
  { name: '', pitchHeight: 1 },
];

function PitchDiagram({ reading, pitchNum, showMora, showLabel, colors, ...rest }) {
  let mora = placeholderMora;
  let data = placeholderData;
  let moraCount = 5;

  if (pitchNum !== -1) {
    mora = getMorae(reading);
    moraCount = getMoraCount(mora);
    data = makePitchPattern(moraCount, pitchNum).map((pitch, i, pattern) => ({
      name: i === pattern.length - 1 ? 'particle' : `${mora[i]}`,
      pitchHeight: pitch,
    }));
  }

  const patternName = getPitchPatternName(moraCount, pitchNum);
  const patternNameJa = getPitchPatternName(moraCount, pitchNum, 'JA');
  const color = colors[patternName];

  return (
    <Wrapper title={`${patternNameJa} [${pitchNum}]`}>
      <LineChart
        width={(moraCount + 1) * 22}
        height={pitchNum < 0 ? 55 : 50}
        data={data}
        margin={{
          top: 20,
          right: 10,
          bottom: 10,
          left: 10,
        }}
        {...rest}
      >
        <Line
          isAnimationActive={false}
          dataKey="pitchHeight"
          label={(props) => (showMora ? getMoraLabel(mora, props) : null)}
          stroke={color}
          strokeWidth={2}
          dot={(dot) => <Dot {...dot} fill={dot.payload.name === 'particle' ? '#fff' : color} />}
        />
      </LineChart>
      {showLabel && (
        <div lang="ja">
          {patternNameJa} [{pitchNum}]
        </div>
      )}
    </Wrapper>
  );
}

function getMoraLabel(mora, { x, y, stroke, index }) {
  const label = mora[index];
  const isPlaceholder = label === placeholder;
  return (
    <text
      x={x}
      y={y - 2}
      dy={isPlaceholder ? -11 : -8}
      fill={isPlaceholder ? '#bababa' : stroke}
      fontSize={isPlaceholder ? 20 : 12}
      textAnchor="middle"
    >
      {label}
    </text>
  );
}

export default PitchDiagram;
