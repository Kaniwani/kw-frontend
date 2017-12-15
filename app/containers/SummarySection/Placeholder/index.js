import React from "react";
import PropTypes from "prop-types";

import { PLACEHOLDERS } from "./constants";
import { Heading } from "./styles";

Placeholder.propTypes = {
  summaryType: PropTypes.oneOf(Object.keys(PLACEHOLDERS)).isRequired,
};

function Placeholder({ summaryType }) {
  return (
    <Heading>
      {/* <span lang="ja">{PLACEHOLDERS[summaryType].text}</span> */}
      <span>{PLACEHOLDERS[summaryType].kaomoji}</span>
    </Heading>
  );
}

export default Placeholder;
