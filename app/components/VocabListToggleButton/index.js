import React from "react";
import PropTypes from "prop-types";

import { ToggleButton } from "./styles";

VocabListToggleButton.propTypes = {
  cardsExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func,
};

VocabListToggleButton.defaultProps = {
  onToggle: () => {},
};

function VocabListToggleButton({ cardsExpanded, onToggle, ...props }) {
  const name = cardsExpanded ? "CONTRACT_ALL" : "EXPAND_ALL";
  const title = `${cardsExpanded ? "Shrink" : "Enlarge"} card size`;
  return (
    <ToggleButton plainButton name={name} title={title} size="2em" onClick={onToggle} {...props} />
  );
}

export default VocabListToggleButton;
