import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import cuid from "cuid";

import { selectUseEijiroPro } from 'features/user/selectors';
import { selectWord } from 'features/vocab/selectors';

import {
  createWkVocabUrl,
  createJishoUrl,
  createEijiroUrl,
  createGooUrl,
  createWeblioUrl,
  createForvoUrl,
} from "common/api";

import { Ul, VocabLink } from "./styles";

ReadingLinks.propTypes = {
  word: PropTypes.string.isRequired,
  useEijiroPro: PropTypes.bool.isRequired,
};

export function ReadingLinks({ word, useEijiroPro }) {
  const links = [
    { name: "WK", href: createWkVocabUrl(word) },
    { name: "Jisho", href: createJishoUrl(word) },
    {
      name: `Eijiro${useEijiroPro ? " Pro" : ""}`,
      href: createEijiroUrl(word, useEijiroPro),
    },
    { name: "Goo", href: createGooUrl(word) },
    { name: "Weblio", href: createWeblioUrl(word) },
    { name: "Forvo", href: createForvoUrl(word) },
  ];

  return (
    <Ul>
      {links.map(({ name, href }) => (
        <li key={cuid()}>
          <VocabLink href={href} title={`View on ${name}`} external>
            {name}
          </VocabLink>
        </li>
      ))}
    </Ul>
  );
}

const mapStateToProps = (state, props) => ({
  word: selectWord(state, props),
  useEijiroPro: selectUseEijiroPro(state, props),
});

export default connect(mapStateToProps)(ReadingLinks);
