import React from 'react';
import Icon from '../Icon';

const ExitQuizLink = () => (
  <a
    href="/kw/"
    className="homelink"
    title="Exit quiz and view summary"
  >
    <Icon name='BACK' color='black' size='2rem' />
  </a>
);

export default ExitQuizLink;
