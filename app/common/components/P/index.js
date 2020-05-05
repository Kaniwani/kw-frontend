import styled, { css } from 'styled-components';
import { epsilon, bodyRhythm } from 'common/styles/typography';

const alignMixin = ({ align }) => css`
  margin-left: ${align === 'center' ? 'auto' : 0};
  margin-right: ${align === 'center' ? 'auto' : 0};
`;

const textAlignMixin = ({ textAlign }) => textAlign
  && css`
    text-align: ${textAlign};
  `;

const constrainMixin = ({ constrain }) => constrain
  && css`
    max-width: 45em;
  `;

export const P = styled.p`
  ${epsilon}
  ${bodyRhythm}
  ${alignMixin}
  ${textAlignMixin}
  ${constrainMixin}
`;

export default P;
