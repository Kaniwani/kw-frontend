import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, branch, renderNothing } from 'recompose';

import { selectInfoActivePanel } from 'containers/QuizPage/selectors';
import AddSynonym from 'components/AddSynonym';

import { PanelWrapper } from 'containers/QuizInfo/styles';

AddSynonymPanel.propTypes = {
  id: PropTypes.number.isRequired,
};

function AddSynonymPanel({ id }) {
  return (
    <PanelWrapper>
      <AddSynonym id={id} />
    </PanelWrapper>
  );
}

const mapStateToProps = (state) => ({
  activePanel: selectInfoActivePanel(state),
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ activePanel }) => activePanel !== 'SYNONYM', renderNothing)
);

export default enhance(AddSynonymPanel);
