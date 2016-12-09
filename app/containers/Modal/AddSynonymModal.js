import React from 'react';
import styled from 'styled-components';
import { media } from 'shared/styles/media';
import { units } from 'shared/styles/spacing';
import { fluidType } from 'shared/styles/utils';
import {
  whiteLight,
  greyLight,
  black,
} from 'shared/styles/colors';

const Wrapper = styled.div`
  background-color: rgb(${whiteLight})
`;

const Heading = styled.h3`
  text-align: left;
  margin: 0 ${units.sm} ${units.sm} ${units.sm};
  padding: ${units.md} 0 .5em;
  line-height: 1.2;
  border-bottom: 2px solid rgba(${greyLight}, .1);
`;

const Form = styled.form`
  text-align: center;
  margin: ${units.sm} auto 0;
  padding: 0 5%;
  ${media('min').md`
    margin-top: ${units.lg};
  `}
`;

const Label = styled.label`
  display: flex;
  margin-top: ${units.sm};
  justify-content: center;
  align-items: center;
  align-content: center;

  ${media('min').lg`
    margin-top: ${units.md};
  `}
`;

const LabelText = styled.span`
  display: inline-block;
  flex: 0 1 auto;
  padding: 0;
  padding-right: .6em;
  text-align: right;
`;

const Input = styled.input`
  display: inline-block;
  ${fluidType(16, 30)}
  appearance: none;
  flex: 1 5 100px;
  vertical-align: middle;
  padding: .35em .6em;
  border: 1px solid rgba(${greyLight}, .3);
  border-radius: 3px;
  box-shadow: inset 0 3px 20px -8px rgba(${black}, 0.3);
`;

const Validation = styled.div`
  margin-top: ${units.sm};
  padding: 0 1.2em;
  font-style: italic;
  ${media('min').md`
    margin-top: ${units.md};
  `}
`;

const SubmitButton = styled.button`
  margin: ${units.sm} auto;
  text-align: center;
  border: 1px solid rgb(${greyLight});

  ${media('min').md`
    margin-top: ${units.md};
    margin-bottom: ${units.md};
  `}
`;

export default function () {
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
