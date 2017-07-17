import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';

import quiz from 'containers/QuizPage/actions';
import { selectInfoActivePanel } from 'containers/QuizPage/selectors';
import { Wrapper } from './styles';
import Toggle from './Toggle';

ToggleBar.propTypes = {
  activePanel: PropTypes.string,
  handleInfoClick: PropTypes.func.isRequired,
  handleNotesClick: PropTypes.func.isRequired,
  handleSynonymClick: PropTypes.func.isRequired,
};

ToggleBar.defaultProps = {
  activePanel: 'INFO',
};

const mapStateToProps = createStructuredSelector({
  activePanel: selectInfoActivePanel,
});

const mapDispatchToProps = {
  updateInfo: quiz.info.update,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleNotesClick: ({ updateInfo }) => () => updateInfo({ activePanel: 'NOTES' }),
    handleSynonymClick: ({ updateInfo }) => () => updateInfo({ activePanel: 'SYNONYM' }),
    handleInfoClick: ({ updateInfo }) => () => updateInfo({ activePanel: 'INFO' }),
  }),
);

function ToggleBar({
  activePanel,
  handleNotesClick,
  handleInfoClick,
  handleSynonymClick,
}) {
  return (
    <Wrapper>
      <Toggle
        isActive={activePanel === 'NOTES'}
        handleClick={handleNotesClick}
      >
        Notes
      </Toggle>

      <Toggle
        isActive={activePanel === 'INFO'}
        handleClick={handleInfoClick}
      >
        Info
      </Toggle>

      <Toggle
        isActive={activePanel === 'SYNONYM'}
        handleClick={handleSynonymClick}
      >
        Add Synonym
      </Toggle>
    </Wrapper>
  );
}

export default enhance(ToggleBar);
