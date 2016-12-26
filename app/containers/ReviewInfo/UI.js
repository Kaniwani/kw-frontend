import styled from 'styled-components';
import TagList from 'components/TagList';
import { whiteLight, greyLight, greyDark, green, red } from 'shared/styles/colors';
import { siteMaxWidth } from 'shared/styles/sizing';
import { media } from 'shared/styles/media';

export const Wrapper = styled.div`
  background-color: transparent;
  overflow: hidden;
  width: 100%;
  z-index: 2;
  max-width: ${siteMaxWidth}px;
  margin-left: auto;
  margin-right: auto;
  ${media('min').sm`
    margin-bottom: 2rem;
  `}
`;

export const PanelWrapper = styled.div`
  padding: .4rem;
  background-color: rgb(${whiteLight});
  &:last-of-type {
    padding-bottom: ${(props) => props.addPadding ? '1.2rem' : '.4rem'};
  }
  ${media('min').sm`
    margin-left: .6rem;
    margin-right: .6rem;
    &:first-of-type {
      border-radius: .3rem .3rem 0 0;
    }
    &:last-of-type {
      border-radius: 0 0 .3rem .3rem;
    }
    &:only-child {
      border-radius: .3rem;
    }
  `}
`;

export const Heading = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: .2rem 0 .4rem;
  margin-bottom: .2rem;
  border-bottom: 1px solid rgb(${greyLight});
`;

export const H4 = styled.h4`
  display: flex;
  margin: 0;
  margin-left: .2rem;
  opacity: .8;
  text-align: left;
  flex: 0 0 auto;
  align-self: flex-start;
`;

export const Tags = styled(TagList)`
  display: flex;
  flex: 1 1 70%;
  align-self: center;
  flex-flow: row wrap;
  justify-content: flex-end;
`;

export const RowItem = styled.div`
  flex: 0 1 auto;
  margin: 0 1rem;
  padding: 0;
  text-align: center;
`;

export const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
  &.is-reading-pair{
    > div {
      flex: 0 1 100%;
    }
    > div:first-of-type {
      font-size: 2.6em;
    }
    > div:not(:first-of-type) {
      font-size: 1.3em;
      color: rgb(${greyDark});
      transform: translateY(-.3rem);
    }
  }
  &.is-sentence-pair {
    text-align: center;
    color: #666;
    > div {
      max-width: 500px;
    }
    > div:first-of-type {
      font-size: 1.4em;
    }
    > div:not(:first-of-type) {
      font-size: 1em;
      font-style: italic;
    }
  }
`;

const IconButton = styled.button`
  &[type="button"] {
    display: block;
    appearance: none;
    border-radius: 5px;
    align-self: center;
    transform: translateY(1px);
    padding: 2px;
    line-height: 1;
    margin-left: .4rem;
    font-size: .75em;
    background-color: transparent;
    color: currentColor;
    cursor: pointer;
    transition: opacity .2s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
`;

export const AddButton = styled(IconButton)`
  &[type="button"] {
    background-color: transparent;
    color: rgb(${green});
    opacity: .9;
    margin-left: .2rem; /* icon size is larger in this button */
  }
`;

export const RemoveButton = styled(IconButton)`
  &[type="button"] {
    color: rgb(${whiteLight});
    background-color: rgb(${red});
    opacity: .6;
  }
`;
