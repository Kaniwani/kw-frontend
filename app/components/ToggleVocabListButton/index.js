import React from "react";
import PropTypes from "prop-types";

import { ToggleButton } from "./styles";

ToggleVocabListButton.propTypes = {
  cardsExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

// FIXME: use state if no onToggle, set isControlled?

function ToggleVocabListButton({ cardsExpanded, onToggle }) {
  const name = cardsExpanded ? "CONTRACT_ALL" : "EXPAND_ALL";
  const title = `${cardsExpanded ? "Shrink" : "Enlarge"} card size`;
  return <ToggleButton name={name} title={title} size="2em" onClick={onToggle} />;
}

export default ToggleVocabListButton;
