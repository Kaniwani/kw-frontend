import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { cycleDetailLevel } from './utils';
import { selectCurrentId } from 'containers/App/selectors';
import { selectInfoDisabled } from 'containers/QuizPage/selectors';

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
};

function QuizInfo({ id, category, isDisabled }) {
  return (
    <Wrapper>
      <ToggleBar />
      <PanelsWrapper isDisabled={isDisabled}>
        <NotesPanel id={id} />
        <InfoPanel id={id} />
        <AddSynonymPanel id={id} category={category} />
      </PanelsWrapper>
    </Wrapper>
  );
}

const mapStateToProps = (state, { category }) => ({
  id: selectCurrentId(state, { category }),
  isDisabled: selectInfoDisabled(state),
});

export default connect(mapStateToProps)(QuizInfo);
