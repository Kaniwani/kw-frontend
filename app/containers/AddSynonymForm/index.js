import React from 'react';
import { connect } from 'react-redux';
import selectAddSynonymForm from './selectors';
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

export class AddSynonymForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <Heading>Add an accepted answer synonym</Heading>
        <Form onSubmit={(ev) => { ev.preventDefault(); console.log('submitted!'); }}>
          <Label htmlFor="newKana">
            <LabelText>New Kana:</LabelText>
            <Input id="newKana" type="text" />
          </Label>
          <Label htmlFor="newCharacters">
            <LabelText>New Kanji:</LabelText>
            <Input id="newCharacters" type="text" />
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

const mapStateToProps = selectAddSynonymForm();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSynonymForm);
