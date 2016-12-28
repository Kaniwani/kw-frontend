import styled from 'styled-components';
import { white, black } from 'shared/styles/colors';
import { mega } from 'shared/styles/typography';
import { media } from 'shared/styles/media';

const Form = styled.form`
  position: relative;
  max-width: 100%;
  ${mega}
  color: rgb(${black});
  background-color: transparent;
  margin: 0 0 .5rem;
  ${media('min').sm`
    margin: .5rem .6rem;
  `}
  border: 0;
  border-radius: 0;
  outline: none;
  appearance: none;
  z-index: 2;
  &.is-marked {
    color: rgb(${white});
  }
`;

export default Form;
