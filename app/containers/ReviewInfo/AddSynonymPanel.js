import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { greyLight } from 'shared/styles/colors';
import AddSynonymForm from 'containers/AddSynonymForm';
import { PanelWrapper, H4 } from './UI';

const Heading = styled.div`
  margin-top: .2rem;
  padding-top: .4rem;
  border-top: 1px solid rgb(${greyLight});
`;

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
