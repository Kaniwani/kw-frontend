import styled from 'styled-components';
import TagList from 'components/TagList';
import { whiteLight, greyLight, red } from 'shared/styles/colors';
import { border } from 'shared/styles/sizing';
import { fullWidthBg } from 'shared/styles/utils';

export const Wrapper = styled.section`
  background-color: rgb(${whiteLight});
  overflow: hidden;
  width: 100%;
  ${fullWidthBg} /* sets padding-{left,right} */
  padding-bottom: .4rem;
  z-index: 2;
  > * {
    position: relative;
    padding: .4rem;
  }
`;

export const Heading = styled.section`
  display: flex;
  flex-flow: row wrap;
  opacity: .8;
  justify-content: space-between;
  padding: .2rem 0 .4rem;
  margin-bottom: .2rem;
  border-bottom: 1px solid rgb(${greyLight});
`;

export const H4 = styled.h4`
  text-align: left;
  align-self: flex-start;
  margin: 0;
  flex: 0 0 auto;
  display: flex;
`;

export const Tags = styled(TagList)`
  display: flex;
  flex: 1 1 70%;
  /*align-self: center;*/
  flex-flow: row wrap;
  justify-content: flex-end;
`;

export const Row = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  ${(props) => {
    if (props.asReadingPair) {
      return `
        > *:first-of-type {
          font-size: 2.5em;
        }
        > *:last-of-type {
          font-size: 1.8em;
          align-self: flex-end;
          padding-bottom: .2em;
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
        > *:last-of-type {
          font-size: 1em;
          font-style: italic;
        }
      `;
    }
    return 'font-size: 1.5em';
  }};
`;

export const RowItem = styled.div`
  flex: 0 1 ${(props) => props.fullWidth ? '100%' : 'auto'};
  margin: .2rem;
  padding: 0;
`;

export const RemoveButton = styled.button`
  appearance: none;
  border-radius: 5px;
  opacity: .6;
  padding: 2px;
  align-self: center;
  margin-left: .4rem;
  font-size: .75em;
  background-color: rgb(${red});
  color: rgb(${whiteLight});
  cursor: pointer;
  transition: opacity .2s ease-in-out;
  &:hover {
    opacity: .9;
  }
`;
