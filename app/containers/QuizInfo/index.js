import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { cycleDetailLevel } from './utils';
import { selectCurrentId } from 'containers/App/selectors';

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
};

function QuizInfo({ id }) {
  return (
    <Wrapper>
      <ToggleBar />
      <PanelsWrapper>
        <NotesPanel id={id} />
        <InfoPanel id={id} />
        <AddSynonymPanel id={id} />
      </PanelsWrapper>
    </Wrapper>
  );
}

const mapStateToProps = (state, { category }) => ({
  id: selectCurrentId(state, { category }),
});

export default connect(mapStateToProps)(QuizInfo);
