import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { pure } from 'recompose';

import { fluidType } from 'shared/styles/utils';
import { white, whiteLight, blackLight } from 'shared/styles/colors';

export const Wrapper = styled.div`
  width: 100%;
  color: ${white};
  ${fluidType(16, 22)}
  line-height: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

export const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: ${blackLight};
  opacity: .75;
  overflow: hidden;
`;

export const Percentage = styled.span`
  display: block;
  background-color: ${whiteLight};
  transition: width .15s ease-out;
  width: ${({ value }) => value}%;
  height: 100%;
`;

export const StatsWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

export const Stat = styled.li`
  display: flex;
  padding-left: .35em;
  padding-right: .35em;
  line-height: 1;
`;

export const Label = styled.div`
  align-self: center;
  margin-left: .15em;
  font-size: .95em;
`;

export const SummaryLink = pure(styled(Link)`
  display: block;
  cursor: pointer;
  color: currentColor;
  /* svg doesn't reach viewbox edges, let's make the left alignment with gutter more visually pleasing */
  transform: translateX(-0.1em)
`);
