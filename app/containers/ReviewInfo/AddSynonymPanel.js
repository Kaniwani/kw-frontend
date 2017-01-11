import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AddSynonymForm from 'containers/AddSynonymForm';
import { PanelWrapper } from './styles';
import { ANSWER_TYPES } from 'containers/AnswerInput/constants';
import { selectInputText, selectAnswerType } from 'containers/AnswerInput/selectors';
import { addSynonym } from 'containers/AddSynonymForm/actions';

/**
 * Returns text if the field and answer types match
 * @param  {String} [fieldType=''] Input field name
 * @param  {String} [answerType=''] Answer type
 * @param  {String} [text = ''] text to return on successful match
 * @return {String} text
 */
const getInitialValue = (fieldType = '', answerType = '', text = '') =>
  fieldType.toLowerCase() === answerType.toLowerCase() ? text : '';

const AddSynonymPanel = ({ addPadding, submitUserSynonym, answerType, userAnswer }) => (
  <PanelWrapper addPadding={addPadding}>
    <AddSynonymForm
      onSubmit={submitUserSynonym}
      userAnswer={userAnswer}
      answerType={answerType}
      initialValues={fromJS({
        Kanji: getInitialValue('Kanji', answerType, userAnswer),
        Kana: getInitialValue('Kana', answerType, userAnswer),
      })}
    />
  </PanelWrapper>
);

AddSynonymPanel.propTypes = {
  addPadding: PropTypes.bool,
  submitUserSynonym: PropTypes.func.isRequired,
  userAnswer: PropTypes.string.isRequired,
  answerType: PropTypes.oneOf(Object.keys(ANSWER_TYPES)),
};

const mapStateToProps = createStructuredSelector({
  userAnswer: selectInputText(),
  answerType: selectAnswerType(),
});

const mapDispatchToProps = (dispatch) => ({
  submitUserSynonym: (synonym) => dispatch(addSynonym(synonym)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AddSynonymPanel);
