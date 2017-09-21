import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, Dot } from 'recharts';

import Container from 'base/Container';
import { getMorae, getMoraCount, getPitchPatternName, makePitchPattern } from './utils';

PitchDiagram.propTypes = {
  reading: PropTypes.string,
  pitchNum: PropTypes.number,
  showLabels: PropTypes.bool,
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
  showLabels: true,
  colors: {
    heiban: '#d20ca3',
    odaka: '#0cd24d',
    nakadaka: '#27a2ff',
    atamadaka: '#ea9316',
    unknown: '#cccccc',
  },
};


const MoraLabel = (mora, { x, y, stroke, index }) => {
  const label = mora[index];
  return <text x={x} y={y} dy={-8} fill={stroke} fontSize={12} textAnchor="middle">{label}</text>;
};

function PitchDiagram({ reading, pitchNum, showLabels, colors, ...rest }) {
  const mora = getMorae(reading);
  const moraCount = getMoraCount(mora);
  const pattern = makePitchPattern(moraCount, pitchNum);
  const patternName = getPitchPatternName(moraCount, pitchNum);
  const color = colors[patternName];
  const data = pattern.map((pitch, i) => ({ name: (i === pattern.length - 1) ? 'particle' : `${mora[i]}`, pitchHeight: pitch }));

  return (
    <Container>
      <LineChart
        width={(moraCount + 1) * 22}
        height={50}
        data={data}
        isAnimationActive={false}
        margin={{ top: 20, right: 10, bottom: 10, left: 10 }}
        {...rest}
      >
        <Line
          dataKey="pitchHeight"
          label={(props) => showLabels ? MoraLabel(mora, props) : null}
          stroke={color}
          strokeWidth={2}
          dot={(dot) => <Dot {...dot} fill={dot.payload.name === 'particle' ? '#fff' : color} />}
        />
      </LineChart>
    </Container>
  );
}

export default PitchDiagram;
