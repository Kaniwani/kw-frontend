import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import cuid from "cuid";

import { selectPitch, selectPrimaryReading } from 'features/vocab/selectors';
import PitchDiagram from "./PitchDiagram";

PitchDiagramList.propTypes = {
  pitch: PropTypes.arrayOf(PropTypes.number),
  primaryReading: PropTypes.string,
};

PitchDiagramList.defaultProps = {
  pitch: [],
  primaryReading: "",
};

export function PitchDiagramList({ pitch, primaryReading }) {
  return (
    <div>
      {pitch.map((num) => (
        <PitchDiagram key={cuid()} reading={primaryReading} pitchNum={num} />
      ))}
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  pitch: selectPitch(state, props),
  primaryReading: selectPrimaryReading(state, props),
});

export default connect(mapStateToProps)(PitchDiagramList);
