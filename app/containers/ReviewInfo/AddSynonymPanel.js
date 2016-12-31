import React, { PropTypes } from 'react';
import AddSynonymForm from 'containers/AddSynonymForm';
import { PanelWrapper, HeadingWrapper, Heading } from './styles';

const AddSynonymPanel = ({ addPadding }) => (
  <PanelWrapper addPadding={addPadding}>
    <HeadingWrapper>
      <Heading>Add New Synonym</Heading>
    </HeadingWrapper>
    <AddSynonymForm />
  </PanelWrapper>
);

AddSynonymPanel.propTypes = {
  addPadding: PropTypes.bool,
};

export default AddSynonymPanel;
