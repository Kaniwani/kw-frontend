import styled from 'styled-components';
import Icon from 'components/Icon';
import H1 from 'components/H1';
import { unit, border } from 'shared/styles/sizing';
import * as COLORS from 'shared/styles/colors';

export const Header = styled.header`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  padding: .5em;
`;

export const Title = styled(H1)`
  align-self: flex-start;
  margin-top: 0;
`;

export const SummaryNav = styled.nav`
  display: flex;
  align-self: flex-end;
`;

export const LogoWrapper = styled.div`
  display: block;
  background-color: rgb(${COLORS.blueLogo});
  padding: 0 3px 0 2px;
  border-radius: ${border.radius};
  margin-left: auto;
  margin-right: 5px;
`;

export const AlignToIcon = styled.span`
  vertical-align: middle;
  line-height: 1;
`;

export const LinkBlock = styled.div`
  display: inline-flex;
  flex-flow: row nowrap;

  > * {
    display: flex;
    height: 100%;
    flex-direction: column;
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
  max-width: ${unit.siteMaxWidth};
`;

export const SectionHeader = styled.h2`
  margin: 0;
  padding: 1rem;
  color: white;
  background-color: rgb(${(props) => COLORS[props.color]});
`;

export const Section = styled.section`
  padding: 1.5rem 1rem;
`;
