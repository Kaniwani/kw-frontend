import styled from 'styled-components';
import Icon from 'components/Icon';
import { units } from 'shared/styles/spacing';
import * as COLORS from 'shared/styles/colors';

export const Nav = styled.nav`
  width: 100%;
  padding: .5em;
  display: flex;
  justify-content: space-between;
  align-items: top;
`;

export const AlignToIcon = styled.span`
  vertical-align: middle;
  line-height: 1;
`;

export const LinkBlock = styled.div`
  display: inline-flex;
  flex-flow: row nowrap;
  padding-bottom: 1em;

  > * {
    display: flex;
    height: 100%;
    flex-flow: column nowrap;
    justify-content: center;
    padding: 0 1em;
    background-color: black;
    color: #fff;
    letter-spacing: -1px;
    text-shadow: 1px 1px 0 rgba(0,0,0,0.1);
  }

  & > *:first-child {
    transition: background-color 0.2s ease-in;
    border-radius: 3px 0 0 3px;
    background-color: rgb(${COLORS.blue});
    &:hover {
      background-color: rgb(${COLORS.blueLight});
    }
  }

  & > *:last-child {
    border-radius: 0 3px 3px 0;
  }
`;

export const InboxIcon = styled(Icon)`
  margin-right: .4em;
`;

export const Main = styled.main`
  margin-left: auto;
  margin-right: auto;
  max-width: ${units.siteMaxWidth};
`;

export const SectionHeader = styled.h2`
  margin: 0;
  padding: 1rem;
  color: rgb(${COLORS.white});
  background-color: rgb(${(props) => COLORS[props.color]});
`;

export const Section = styled.section`
  padding: 1.5rem 1rem;
`;
