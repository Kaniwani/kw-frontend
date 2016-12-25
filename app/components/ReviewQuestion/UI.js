import styled from 'styled-components';
import TagList from 'components/TagList';
import { white, purpleDark } from 'shared/styles/colors';
import { fluidType } from 'shared/styles/utils';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  text-align: center;
`;

export const MeaningWrapper = styled.div`
  flex: 999 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Meaning = styled.h1`
  ${fluidType(22, 50, 300, 2000)}
  color: rgb(${white});
  margin: 0;
  font-weight: 700;
  letter-spacing: -1px;
  text-shadow: 1px 2px 4px rgb(${purpleDark});
  padding: 10vh 5vw;
`;

export const Tags = styled(TagList)`
  display: flex;
  align-self: flex-start;
  flex-flow: row wrap;
  justify-content: flex-start;
  z-index: 2;
`;
