import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';

import { selectUseEijiroProLink } from 'features/user/selectors';
import { selectWord } from 'features/vocab/selectors';

import Ul from 'common/components/Ul';
import VocabReport from 'features/vocab/Report';
import { Li, VocabLink } from './styles';

import {
  createWkVocabUrl,
  createJishoUrl,
  createEijiroUrl,
  createGooUrl,
  createWeblioUrl,
  createForvoUrl,
} from 'common/api';

ReadingLinks.propTypes = {
  word: PropTypes.string.isRequired,
  useEijiroProLink: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export function ReadingLinks({ id, word, useEijiroProLink }) {
  const links = [
    { name: 'WK', href: createWkVocabUrl(word) },
    { name: 'Jisho', href: createJishoUrl(word) },
    {
      name: `Eijiro${useEijiroProLink ? ' Pro' : ''}`,
      href: createEijiroUrl(word, useEijiroProLink),
    },
    { name: 'Goo', href: createGooUrl(word) },
    { name: 'Weblio', href: createWeblioUrl(word) },
    { name: 'Forvo', href: createForvoUrl(word) },
  ];

  return (
    <Ul plainList>
      {links.map(({ name, href }) => (
        <Li key={cuid()}>
          <VocabLink href={href} title={`View on ${name}`} external>
            {name}
          </VocabLink>
        </Li>
      ))}
      <Li>
        <VocabReport id={id} />
      </Li>
    </Ul>
  );
}

const mapStateToProps = (state, props) => ({
  word: selectWord(state, props),
  useEijiroProLink: selectUseEijiroProLink(state, props),
});

export default connect(mapStateToProps)(ReadingLinks);
