import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { cycleDetailLevel } from './utils';
import { selectCurrentId } from 'containers/App/selectors';
import { selectInfoDisabled, selectInfoActivePanel } from 'containers/QuizPage/selectors';

import ToggleBar from './ToggleBar';
import InfoPanel from './InfoPanel';
import NotesPanel from './NotesPanel';
import AddSynonymPanel from './AddSynonymPanel';

import { Wrapper, PanelsWrapper } from './styles';

QuizInfo.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
  category: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  activePanel: PropTypes.string.isRequired,
};

function QuizInfo({ id, category, isDisabled, activePanel }) {
  return (
    <Wrapper>
      <ToggleBar isDisabled={isDisabled} />
      {Number.isFinite(id) && (
        <PanelsWrapper isMinimized={!activePanel}>
          <NotesPanel id={id} />
          <InfoPanel id={id} />
          <AddSynonymPanel id={id} category={category} />
        </PanelsWrapper>
      )}
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  id: selectCurrentId(state),
  activePanel: selectInfoActivePanel(state),
  isDisabled: selectInfoDisabled(state),
});

export default connect(mapStateToProps)(QuizInfo);
