import styled from 'styled-components';
import Icon from 'components/Icon';
import H1 from 'components/H1';
import { units, borders } from 'shared/styles/spacing';
import * as colors from 'shared/styles/colors';

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
  background-color: rgb(${colors.blueLogo});
  padding: 0 3px 0 2px;
  border-radius: ${borders.radius};
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
    background-color: rgb(${colors.blue});
    &:hover {
      background-color: rgb(${colors.blueLight});
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
  color: white;
  background-color: rgb(${(props) => colors[props.color]});
`;

export const Section = styled.section`
  padding: 1.5rem 1rem;
`;
