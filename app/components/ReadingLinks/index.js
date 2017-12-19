import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import {
  createJishoUrl,
  createGooUrl,
  createWeblioUrl,
  createForvoUrl,
  createWkVocabUrl,
  createEijiroUrl,
} from 'shared/api';

import { Ul, VocabLink } from './styles';

ReadingLinks.propTypes = {
  word: PropTypes.string.isRequired,
  useEijiroPro: PropTypes.bool,
};

ReadingLinks.defaultProps = {
  useEijiroPro: false,
};

function ReadingLinks({ word, useEijiroPro }) {
  const links = [
    { name: 'WK', href: createWkVocabUrl(word) },
    { name: 'Jisho', href: createJishoUrl(word) },
    { name: 'Eijiro', href: createEijiroUrl(word, useEijiroPro) },
    { name: 'Goo', href: createGooUrl(word) },
    { name: 'Weblio', href: createWeblioUrl(word) },
    { name: 'Forvo', href: createForvoUrl(word) },
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

export default ReadingLinks;
