import styled from 'styled-components';
import * as COLORS from 'shared/styles/colors';

export const SectionHeader = styled.h2`
  margin: 0;
  padding: 1rem;
  color: rgb(${COLORS.white});
  background-color: rgb(${(props) => COLORS[props.color]});
`;

export const Section = styled.section`
  padding: 1.5rem 1rem;
`;
