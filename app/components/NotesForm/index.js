import React from "react";
import {
  reduxForm,
  Field,
  propTypes as formPropTypes,
} from "redux-form";

import { MAX_NOTES_LENGTH } from "shared/constants";
import TextAreaAutoSize from "components/TextAreaAutoSize";

NotesForm.propTypes = {
  ...formPropTypes,
};

function NotesForm({ handleSubmit, reset }) {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={TextAreaAutoSize}
        maxLength={MAX_NOTES_LENGTH}
        name="notes"
        required={false}
        onReset={reset}
        placeholder="メモがない"
        showControls
        rows={1}
      />
    </form>
  );
}

export default reduxForm()(NotesForm);
