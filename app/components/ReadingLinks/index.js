import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import cuid from 'cuid';

import {
  createJishoUrl,
  createGooUrl,
  createWeblioUrl,
  createForvoUrl,
  createWkVocabUrl,
  createEijiroUrl,
} from 'shared/api';

import { selectVocabularySettings } from 'shared/selectors';
import { Ul, VocabLink } from './styles';

ReadingLinks.propTypes = {
  character: PropTypes.string.isRequired,
  useEijiroPro: PropTypes.bool.isRequired,
};

function ReadingLinks({ character, useEijiroPro }) {
  const links = [
    { name: 'WK', href: createWkVocabUrl(character) },
    { name: 'Jisho', href: createJishoUrl(character) },
    { name: 'Eijiro', href: createEijiroUrl(character, useEijiroPro) },
    { name: 'Goo', href: createGooUrl(character) },
    { name: 'Weblio', href: createWeblioUrl(character) },
    { name: 'Forvo', href: createForvoUrl(character) },
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
  useEijiroPro: createSelector(selectVocabularySettings, ({ useEijiroPro }) => useEijiroPro)(state),
});

export default connect(mapStateToProps)(ReadingLinks);
