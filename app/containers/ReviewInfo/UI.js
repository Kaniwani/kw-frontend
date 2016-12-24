import styled from 'styled-components';
import TagList from 'components/TagList';
import { whiteLight, greyLight, blackLight, green, red } from 'shared/styles/colors';
import { unit } from 'shared/styles/sizing';

export const Wrapper = styled.div`
  background-color: transparent;
  overflow: hidden;
  width: 100%;
  z-index: 2;
`;

export const PanelWrapper = styled.div`
  padding: .4rem;
  background-color: rgb(${whiteLight});
  box-shadow: inset 2px 0 10px -2px rgba(${blackLight}, .15);
  box-shadow: inset -2px 0 10px -2px rgba(${blackLight}, .15);
  box-shadow: inset 0 0 8px -2px rgba(${blackLight}, .15);
  max-width: ${unit.siteMaxWidth};
  margin-left: auto;
  margin-right: auto;
  &:last-of-type {
    padding-bottom: ${(props) => props.addPadding ? '1.2rem' : '.4rem'};
  }
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
  margin: .2rem 1rem;
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
  ${(props) => {
    if (props.asReadingPair) {
      return `
        > * {
          flex: 0 1 100%;
        }
        > *:first-of-type {
          font-size: 2.5em;
        }
        > *:not(:first-of-type) {
          font-size: 1.8em;
          padding-bottom: .2rem;
        }
      `;
    }
    if (props.asSentencePair) {
      return `
        text-align: center;
        color: #666;
        > *:first-of-type {
          font-size: 1.5em;
        }
        > *:not(:first-of-type) {
          font-size: 1em;
          font-style: italic;
        }
      `;
    }
    return 'font-size: 1.5em';
  }};
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
