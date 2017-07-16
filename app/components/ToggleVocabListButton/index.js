import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectVocabExpanded } from 'containers/App/selectors';
import actions from 'containers/App/actions';
import { ToggleButton } from './styles';

ToggleVocabListButton.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
};

function ToggleVocabListButton({ isExpanded, toggleExpanded }) {
  return (
    <ToggleButton
      name={isExpanded ? 'CONTRACT_ALL' : 'EXPAND_ALL'}
      title={isExpanded ? 'Shrink card size' : 'Enlarge card size'}
      size="2em"
      onClick={toggleExpanded}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  isExpanded: selectVocabExpanded,
});

const mapDispatchToProps = (dispatch) => ({
  toggleExpanded: () => dispatch(actions.settings.vocabulary.expanded.toggle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleVocabListButton);
