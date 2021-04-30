import styled from 'styled-components';
import { resetList, fluidType } from 'common/styles/utils';
import { gutter } from 'common/styles/layout';
import { white, black, transparent } from 'common/styles/colors';

const barHeight = 6;

export const Wrapper = styled.div`
  ${gutter()}
  position: relative;
  padding-top: ${barHeight + 2}px !important;
  width: 100%;
  color: ${white[3]};
  ${fluidType(16, 22)}
  line-height: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  background-color: ${transparent};
`;

export const ActionsWrapper = styled.div`
  display: flex;
  flex-wrap: none;
  align-items: center;
`;

export const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${barHeight}px !important;
  background-color: ${black[2]};
  opacity: .75;
  overflow: hidden;
`;

export const Percentage = styled.span`
  display: block;
  background-color: ${white[2]};
  height: 100%;
`;

export const StatsWrapper = styled.ul`
  ${resetList}
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

export const Stat = styled.div`
  display: flex;
  padding-left: .35em;
  padding-right: .35em;
  line-height: 1;
`;

export const Label = styled.div`
  align-self: center;
  margin-left: .15em;
  font-size: .9em;
`;
