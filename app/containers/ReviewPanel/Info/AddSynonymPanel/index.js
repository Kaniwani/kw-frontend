import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import blockEvent from 'utils/blockEvent';
import { SynonymRecord } from 'shared/models';
import { ANSWER_TYPES, KEYCODES, PANELS } from 'shared/constants';
import AddSynonymForm from 'containers/AddSynonymForm';

import { Wrapper, PanelWrapper } from '../styles';

class AddSynonymPanel extends React.Component {
  static propTypes = {
    submitUserSynonym: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    userAnswer: PropTypes.string.isRequired,
    answerType: PropTypes.oneOf(Object.keys(ANSWER_TYPES)).isRequired,
    reviewId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.panelNode.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    this.panelNode.removeEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Returns text if the field and answer types match
   * @param  {String} [fieldType=''] Input field name
   * @param  {String} [answerType=''] Answer type
   * @param  {String} [text = ''] text to return on successful match
   * @return {String} text
   */
  getInitialValue = (fieldType = '', answerType = '', text = '') =>
    fieldType.toLowerCase() === answerType.toLowerCase() ? text : ''

  getKeyHandler = (keycode) => ({
    [KEYCODES.ESCAPE]: this.props.handleClose,
  }[keycode])

  handleKeyDown = (event) => {
    const action = this.getKeyHandler(event.keyCode);
    if (action) {
      blockEvent(event);
      action();
    }
  }
  // synonym is currently a Map from redux-form
  handleSubmit = (synonym) =>
    this.props.submitUserSynonym(new SynonymRecord(synonym.merge({
      review: this.props.reviewId,
      character: synonym.get('kanji'),
    })));

  render() {
    const { answerType, userAnswer } = this.props;
    return (
      <Wrapper>
        <PanelWrapper innerRef={(node) => { this.panelNode = node; }}>
          <AddSynonymForm
            onSubmit={(synonym) => this.handleSubmit(synonym)}
            userAnswer={userAnswer}
            answerType={answerType}
            initialValues={fromJS({
              kanji: this.getInitialValue('kanji', answerType, userAnswer),
              kana: this.getInitialValue('kana', answerType, userAnswer),
            })}
          />
        </PanelWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userAnswer: selectAnswerInput,
  answerType: selectAnswerType,
  reviewId: selectCurrentId,
});

const mapDispatchToProps = (dispatch) => ({
  submitUserSynonym: (synonym) =>
    dispatch(synonymActions.addSynonymRequest(synonym)),
  handleClose: () => {
    dispatch(reviewActions.updateAnswer({ focus: true }));
    dispatch(reviewActions.updatePanels({ show: PANELS.INFO }));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(AddSynonymPanel);
