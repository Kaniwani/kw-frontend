import styled from 'styled-components';
import { adjustColor, fluidType } from 'shared/styles/utils';
import { greyLight, black } from 'shared/styles/colors';

/* eslint-disable import/prefer-default-export */
export const StyledJapaneseInput = styled.input`
  display: inline-block;
  max-width: 500px;
  ${fluidType(16, 28)}
  appearance: none;
  line-height: 1.8; /* lowercase descenders are cut off otherwise */
  flex: 1 5 100px;
  vertical-align: middle;
  padding: 0 .5rem;
  border: 1px solid ${adjustColor(greyLight, 'alpha(0.3)')};
  border-radius: 3px;
  box-shadow: inset 0 3px 20px -8px ${adjustColor(black, 'alpha(0.3)')};
`;
/* eslint-enable */
