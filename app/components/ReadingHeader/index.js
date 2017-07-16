import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Heading, VocabLink } from './styles';

ReadingHeader.propTypes = {
  character: PropTypes.string.isRequired,
  useAlcPro: PropTypes.bool.isRequired,
};

const createAlcLink = (character, useAlcPro) =>
  `http://${useAlcPro ? 'eowpf' : 'eow'}.alc.co.jp/search?q=${encodeURIComponent(character)}`;
const createGooLink = (character) => `http://dictionary.goo.ne.jp/srch/all/${encodeURIComponent(character)}/m0u/`;
const createWeblioLink = (character) => `http://ejje.weblio.jp/content/${encodeURIComponent(character)}`;
const createForvoLink = (character) => `http://forvo.com/search/${encodeURIComponent(character)}/`;

function ReadingHeader({ character, useAlcPro }) {
  return (
    <Wrapper>
      <Heading>
        Reading
      </Heading>
      <VocabLink
        href={`//wanikani.com/vocabulary/${character}`}
        title="View on WaniKani"
        external
      >
        WK
      </VocabLink>
      <VocabLink
        href={createAlcLink(character, useAlcPro)}
        title="View on Alc (Eijiro)"
        external
      >
        ALC
      </VocabLink>
      <VocabLink
        href={createGooLink(character)}
        title="View on Goo"
        external
      >
        GOO
      </VocabLink>
      <VocabLink
        href={createWeblioLink(character)}
        title="View on Weblio"
        external
      >
        WEBLIO
      </VocabLink>
      <VocabLink
        href={createForvoLink(character)}
        title="View on Forvo"
        external
      >
        FORVO
      </VocabLink>
    </Wrapper>
  );
}

export default ReadingHeader;
