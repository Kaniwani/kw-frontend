import React, { PropTypes } from 'react';
import AddSynonymForm from 'containers/AddSynonymForm';
import { PanelWrapper, Heading, H4 } from './UI';

const AddSynonymPanel = ({ addPadding }) => (
  <PanelWrapper addPadding>
    <Heading>
      <H4>Add New Synonym</H4>
    </Heading>
    <AddSynonymForm />
  </PanelWrapper>
);

AddSynonymPanel.propTypes = {
  addPadding: PropTypes.bool,
};

export default AddSynonymPanel;
