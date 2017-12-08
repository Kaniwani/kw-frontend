import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, branch, renderNothing } from 'recompose';
import { isKana } from 'wanakana';

import { selectInfoActivePanel, selectAnswerValue } from 'pages/QuizPage/selectors';
import AddSynonym from 'components/AddSynonym';

import { PanelWrapper } from 'containers/QuizInfo/styles';

AddSynonymPanel.propTypes = {
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  answerValue: PropTypes.string.isRequired,
  answerType: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({
    kanji: PropTypes.string,
    kana: PropTypes.string,
  }).isRequired,
};

function AddSynonymPanel(props) {
  return (
    <PanelWrapper>
      <AddSynonym {...props} />
    </PanelWrapper>
  );
}

const mapStateToProps = (state) => {
  const answerValue = selectAnswerValue(state);
  const answerType = isKana(answerValue) ? 'kana' : 'kanji';
  const kanji = answerType === 'kanji' ? answerValue : '';
  const kana = answerType === 'kana' ? answerValue : '';
  return {
    activePanel: selectInfoActivePanel(state),
    answerValue,
    answerType,
    initialValues: {
      kanji,
      kana,
    },
  };
};

const enhance = compose(
  connect(mapStateToProps),
  branch(({ activePanel }) => activePanel !== 'SYNONYM', renderNothing)
);

export default enhance(AddSynonymPanel);
