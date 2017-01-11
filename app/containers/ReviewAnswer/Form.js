import styled from 'styled-components';
import { white, black } from 'shared/styles/colors';
import { mega } from 'shared/styles/typography';
import { media } from 'shared/styles/media';

const Form = styled.form`
  position: relative;
  max-width: 100%;
  ${mega}
  color: ${black};
  background-color: rgba(0, 0, 0, 0);
  margin: 0 0 .4rem;
  ${media('min').sm`
    margin: .4rem;
  `}
  border: 0;
  border-radius: 0;
  outline: none;
  appearance: none;
  z-index: 2;
  &.is-marked {
    color: ${white};
  }
`;

export default Form;
