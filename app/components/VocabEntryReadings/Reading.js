import React from 'react';
import PropTypes from 'prop-types';

import Container from 'base/Container';
import H1 from 'base/H1';
import P from 'base/P';

Reading.propTypes = {
  kana: PropTypes.array.isRequired,
  character: PropTypes.string.isRequired,
};

function Reading({ kana, character }) {
  return (
    <Container>
      <H1>{character}</H1>
      <P>{kana.join('・')}</P>
    </Container>
  );
}

export default Reading;
