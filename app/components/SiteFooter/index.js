import React from 'react';

import Element from 'base/Element';
import A from 'base/A';

import { Footer } from './styles';

function SiteFooter() {
  return (
    <Footer>
      <Element><A plainLink to="/about">About</A></Element>
      <Element><A plainLink to="/vocabulary">Vocabulary</A></Element>
      <Element><A plainLink to="/settings">Settings</A></Element>
      <Element><A plainLink to="/logout">Logout</A></Element>
      <Element><A plainLink to="/about">Contact</A></Element>
      <Element><A plainLink to="/about">FAQ</A></Element>
    </Footer>
  );
}

export default SiteFooter;
