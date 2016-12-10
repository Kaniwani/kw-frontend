import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectInputText,
  selectAnswerType,
} from 'containers/AnswerInput/selectors';

import {
  Wrapper,
  Heading,
  Form,
  Label,
  LabelText,
  Input,
  Validation,
  SubmitButton,
} from './UI';

export class AddSynonymForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    answerType: PropTypes.string.isRequired,
  }

  componentDidMount() {
    if (this.props.isVisible) this[(this.props.answerType === 'kana' ? 'charInput' : 'kanaInput')].focus();
  }

  render() {
    return (
      <Wrapper>
        <Heading>Add an accepted answer synonym</Heading>
        <Form onSubmit={(ev) => { ev.preventDefault(); console.log('submitted!'); }}>
          <Label htmlFor="newKana">
            <LabelText>New Kana:</LabelText>
            <Input innerRef={(node) => { this.kanaInput = node; }} defaultValue={this.props.text} id="newKana" type="text" />
          </Label>
          <Label htmlFor="newCharacters">
            <LabelText>New Kanji:</LabelText>
            <Input innerRef={(node) => { this.charInput = node; }} defaultValue={this.props.text} id="newCharacters" type="text" />
          </Label>
          <Validation>
            <p>
              Please provide both Kana and Kanji.
              If there is no associated Kanji (IE.<span lang="ja">アメリカ</span>)
              – use Hiragana for the Kanji field.
            </p>
          </Validation>
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  text: selectInputText(),
  answerType: selectAnswerType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSynonymForm);
