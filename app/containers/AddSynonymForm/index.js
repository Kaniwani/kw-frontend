import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

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
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
  }

  // TODO: change to relevant field
  componentDidUpdate() {
    if (this.props.isVisible) this.kanaInput.focus();
  }

  render() {
    return (
      <Wrapper>
        <Heading>Add an accepted answer synonym</Heading>
        <Form onSubmit={(ev) => { ev.preventDefault(); console.log('submitted!'); }}>
          <Label htmlFor="newKana">
            <LabelText>New Kana:</LabelText>
            <Input innerRef={(node) => { this.kanaInput = node; }} id="newKana" type="text" />
          </Label>
          <Label htmlFor="newCharacters">
            <LabelText>New Kanji:</LabelText>
            <Input innerRef={(node) => { this.charInput = node; }} id="newCharacters" type="text" />
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

const mapStateToProps = {

};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSynonymForm);
