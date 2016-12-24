import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import blockEvent from 'utils/blockEvent';
import kanawana from 'shared/kanawana';
// import LoadingIndicator from 'components/LoadingIndicator';

import {
  selectInputText,
  selectAnswerType,
} from 'containers/AnswerInput/selectors';

// import {
//   selectJishoData,
// } from './selectors';
//
// import {
//   loadJishoData,
// } from './actions';

import {
  Form,
  Label,
  LabelText,
  Input,
  Validation,
  SubmitButton,
} from './UI';

export class AddSynonymForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    text: PropTypes.string.isRequired,
    answerType: PropTypes.string.isRequired,
    // jishoData: PropTypes.instanceOf(Immutable.Iterable),
    // loadJishoData: PropTypes.func.isRequired,
  }

  componentDidMount() {
    kanawana.bind(this.kanaInput);
    kanawana.bind(this.charInput);
    // TODO: jisho api won't do cross-origin at the moment, revisit this when/if api gets the long-awaited upgrade
    // this.props.loadJishoData(this.props.text);
    this[(this.props.answerType === 'kana' ? 'charInput' : 'kanaInput')].focus();
  }

  componentWillUnmount() {
    kanawana.unbind(this.kanaInput);
    kanawana.unbind(this.charInput);
  }

  _determineTextValue = (field, answerType, text) => {
    if (answerType === 'kana' && field === 'kanaInput') return text;
    if (answerType === 'mixed' && field === 'charInput') return text;
    return '';
  }

  _handleSubmit = (event) => {
    blockEvent(event);
    // TODO: need to ensure all fields are valid
    // IE: chars/kana are isKanjiKana() / isKana()
    console.info('TODO: Implement saga to Add Synonym'); // eslint-disable-line no-alert
    console.info('TODO: Implement saga watcher to close form & advance when synonym added/requested'); // eslint-disable-line no-alert
  }

  render() {
    const { answerType, text /* , jishoData */ } = this.props;
    return (
      <Form onSubmit={this._handleSubmit}>
        <Label htmlFor="newKana">
          <LabelText>Kana:</LabelText>
          <Input
            id="newKana"
            type="text"
            lang="ja"
            innerRef={(node) => { this.kanaInput = node; }}
            defaultValue={this._determineTextValue('kanaInput', answerType, text)}
          />
        </Label>
        <Label htmlFor="newCharacters">
          <LabelText>Kanji:</LabelText>
          <Input
            id="newCharacters"
            type="text"
            lang="ja"
            innerRef={(node) => { this.charInput = node; }}
            defaultValue={this._determineTextValue('charInput', answerType, text)}
          />
        </Label>
        <Validation>
          <p>
            Please provide both Kana and Kanji.
            If there is no associated Kanji for the word (IE.<span lang="ja">アメリカ</span>)
            – use Hiragana for the Kanji field.
          </p>
        </Validation>
        {/* {jishoData ? <div>jishoData</div> : <LoadingIndicator />} */}
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  text: selectInputText(),
  answerType: selectAnswerType(),
  // jishoData: selectJishoData(),
});

const mapDispatchToProps = (dispatch) => ({
  // loadJishoData: (keyword) => dispatch(loadJishoData(keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSynonymForm);
