import styled from 'styled-components';
import TagList from 'components/TagList';
import H3 from 'components/H3';
import P from 'components/P';
import { whiteLight, greyDark, green, red } from 'shared/styles/colors';
import { siteMaxWidth } from 'shared/styles/sizing';
import { resetButton } from 'shared/styles/utils';
import { containerGutter, elementGutter } from 'shared/styles/layout';
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
  ${containerGutter}
  background-color: ${whiteLight};
  ${media('min').sm`
    margin-left: .6rem;
    margin-right: .6rem;
    &:first-child {
      border-radius: .3rem .3rem 0 0;
    }
    &:last-child {
      border-radius: 0 0 .3rem .3rem;
    }
    &:only-child {
      border-radius: .3rem;
    }
  `}
`;

export const HeadingWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

export const Heading = styled(H3)`
  ${elementGutter}
  display: flex;
  margin: 0;
  opacity: .8;
  text-align: left;
  flex: 0 0 auto;
  align-self: center;
`;

export const Tags = styled(TagList)`
  ${elementGutter}
  display: flex;
  flex: 1 1 70%;
  align-self: center;
  flex-flow: row wrap;
  justify-content: flex-end;
  /* negate chip margin */
  margin-top: -.15em;
  margin-bottom: -.15em;
`;

export const RowItem = styled(P)`
  ${elementGutter}
  flex: 0 1 auto;
  margin: 0 1rem;
  text-align: center;
  .is-reading-pair & {
    line-height: 1;
    flex: 0 1 100%;

    &:first-child { /* kanji */
      font-size: 2.6em;
    }

    &:not(:first-child) { /* kana */
      font-size: 1.5em;
      margin-top: 0; /* overwrite <P> style */
      color: ${greyDark};
    }
  }
  .is-sentence-pair & {
    text-align: center;
    color: #666;
    flex: 0 1 100%;

    &:first-child {
      font-size: 1.5em; /* always prefer Japanese chars larger */
    }

    &:not(:first-child) {
      font-size: 1em;
      margin-top: 0; /* overwrite <P> style */
      font-style: italic;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
`;

const IconButton = styled.button`
  & {
    ${resetButton}
    display: block;
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
  & {
    ${resetButton}
    background-color: transparent;
    color: ${green};
    opacity: .9;
    margin-left: .2rem; /* icon size is larger in this button */
  }
`;

export const RemoveButton = styled(IconButton)`
  & {
    ${resetButton}
    color: ${whiteLight};
    background-color: ${red};
    opacity: .6;
  }
`;
