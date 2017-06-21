import styled from 'styled-components';
import { epsilon, bodyRhythm } from 'shared/styles/typography';
import { gutter } from 'shared/styles/layout';

const lineLengthMixin = ({ align }) => `
  max-width: 35em;
  margin-left: ${align === 'center' ? 'auto' : 0};
  margin-right: ${align === 'center' ? 'auto' : 0};
`;

const textAlignMixin = ({ textAlign }) => textAlign && `text-align: ${textAlign};`;

export const P = styled.p`
  ${gutter()}
  ${epsilon}
  ${bodyRhythm}
  ${lineLengthMixin}
  ${textAlignMixin}
`;

export default P;
