import styled from 'styled-components';
import { epsilon, bodyRhythm } from 'shared/styles/typography';
import { gutter } from 'shared/styles/layout';

const alignMixin = ({ align }) => `
  margin-left: ${align === 'center' ? 'auto' : 0};
  margin-right: ${align === 'center' ? 'auto' : 0};
`;

const textAlignMixin = ({ textAlign }) => textAlign && `text-align: ${textAlign};`;
const constrainMixin = ({ constrain }) => constrain && 'max-width: 45em;';

export const P = styled.p`
  ${gutter()}
  ${epsilon}
  ${bodyRhythm}
  ${alignMixin}
  ${textAlignMixin}
  ${constrainMixin}
`;

export default P;
