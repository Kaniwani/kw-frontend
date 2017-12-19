import React from "react";
import PropTypes from "prop-types";

import cuid from "cuid";
import PitchDiagram from "components/PitchDiagram";

PitchDiagramList.propTypes = {
  pitch: PropTypes.arrayOf(PropTypes.number),
  primaryReading: PropTypes.string,
};

PitchDiagramList.defaultProps = {
  pitch: [],
  primaryReading: "",
};

function PitchDiagramList({ pitch, primaryReading }) {
  return (
    <div>
      {pitch.map((num) => (
        <PitchDiagram key={cuid()} reading={primaryReading} pitchNum={num} />
      ))}
    </div>
  );
}

export default PitchDiagramList;
