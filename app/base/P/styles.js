import styled, { css } from 'styled-components';
import { epsilon, bodyRhythm } from 'shared/styles/typography';
import { elementGutter } from 'shared/styles/layout';

const lineLengthMixin = css`
  max-width: 35em;
  margin-left: ${({ align }) => align === 'center' ? 'auto' : 0};
  margin-right: ${({ align }) => align === 'center' ? 'auto' : 0};
`;

const textAlignMixin = ({ textAlign }) => textAlign && `text-align: ${textAlign};`;

export const StyledP = styled.p`
  ${elementGutter}
  ${epsilon}
  ${bodyRhythm}
  ${textAlignMixin}
  ${lineLengthMixin}
`;
