import React from 'react';
import PropTypes from 'prop-types';

import { MAX_NOTES_LENGTH } from "shared/constants";
import TextForm from "components/TextForm";

Notes.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
};

Notes.defaultProps = {
  initialValue: '',
};

function Notes({ onSubmit, initialValue }) {
  return (
    <TextForm
      initialValue={initialValue}
      maxLength={MAX_NOTES_LENGTH}
      name="notes"
      placeholder="メモがない"
      rows={1}
      onSubmit={onSubmit}
    />
  );
}

export default Notes;
