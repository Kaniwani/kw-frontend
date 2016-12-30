import styled from 'styled-components';
import TagList from 'components/TagList';
import { white, purpleDark } from 'shared/styles/colors';
import { giga } from 'shared/styles/typography';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  text-align: center;
  flex: 1 1 100%;
`;

export const MeaningWrapper = styled.div`
  flex: 999 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Meaning = styled.h1`
  ${giga}
  color: rgb(${white});
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-shadow: .1em .2em .4em rgb(${purpleDark});
  padding: 2em .5em;
`;

export const Tags = styled(TagList)`
  display: flex;
  align-self: flex-start;
  flex-flow: row wrap;
  justify-content: flex-start;
  z-index: 2;
`;
