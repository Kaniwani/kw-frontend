import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import cuid from 'cuid';

import { selectVocabularySettings } from 'containers/App/selectors';
import { Ul, VocabLink } from './styles';

const createGooLink = (character) => `http://dictionary.goo.ne.jp/srch/all/${encodeURIComponent(character)}/m0u/`;
const createWeblioLink = (character) => `http://ejje.weblio.jp/content/${encodeURIComponent(character)}`;
const createForvoLink = (character) => `http://forvo.com/search/${encodeURIComponent(character)}/`;
const createWaniKaniVocabLink = (character) => `https://wanikani.com/vocabulary/${encodeURIComponent(character)}`;
const createAlcLink = (character, useAlcPro) => `http://${useAlcPro ? 'eowpf' : 'eow'}.alc.co.jp/search?q=${encodeURIComponent(character)}`;

VocabEntryLinks.propTypes = {
  character: PropTypes.string.isRequired,
  useAlcPro: PropTypes.bool.isRequired,
};

function VocabEntryLinks({ character, useAlcPro }) {
  const links = [
    { name: 'WK', href: createWaniKaniVocabLink(character) },
    { name: 'Alc', href: createAlcLink(character, useAlcPro) },
    { name: 'Goo', href: createGooLink(character) },
    { name: 'Weblio', href: createWeblioLink(character) },
    { name: 'Forvo', href: createForvoLink(character) },
  ];

  return (
    <Ul>
      {links.map(({ name, href }) => (
        <li key={cuid()}>
          <VocabLink href={href} title={`View on ${name}`} external>{name}</VocabLink>
        </li>
      ))}
    </Ul>
  );
}

const mapStateToProps = (state) => ({
  useAlcPro: createSelector(selectVocabularySettings, ({ useAlcPro }) => useAlcPro)(state),
});

export default connect(mapStateToProps)(VocabEntryLinks);
