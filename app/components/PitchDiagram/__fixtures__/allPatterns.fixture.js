import React from "react";
import cuid from "cuid";
import PitchDiagram from "components/PitchDiagram";
import testPatterns from "components/PitchDiagram/__tests__/testPatterns";

const component = ({ children }) => <div>{children}</div>;
component.displayName = "Pitch Patterns";

const patterns = testPatterns.map((group) => (
  <div
    key={cuid()}
    style={{
      display: "flex",
      flexFlow: "row wrap",
    }}
  >
    {group.map((props) => <PitchDiagram key={cuid()} {...props} />)}
  </div>
));

export default {
  component,
  children: patterns,
};
