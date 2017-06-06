import React from 'react';
import { storiesOf } from '@storybook/react';
import P from 'base/P';
import Img from 'base/Img';
import homeImg from 'shared/assets/img/home.jpg';
import Element from '../index';
import ColorBlock from '../../../../.storybook/utils/ColorBlock'; // relatively painful

storiesOf('layouts.Element', module)
  .add('with paragraph child', () => (
    <Element><P>Hello Element</P></Element>
  ))
  .add('as multiple children', () => (
    <div>
      <Element>
        <P>Hello Element 1</P>
      </Element>
      <Element>
        <P>Hello Element 2</P>
      </Element>
      <Element>
        <P>Hello Element 3</P>
      </Element>
    </div>
  ))
  .add('with flexRow and multiple children', () => (
    <div>
      <Element flexRow>
        <ColorBlock />
        <ColorBlock />
        <ColorBlock />
      </Element>
    </div>
  ))
  .add('with flexColumn and multiple children', () => (
    <div>
      <Element flexColumn>
        <ColorBlock />
        <ColorBlock />
        <ColorBlock />
      </Element>
    </div>
  ))
  .add('with flexRow + flexCenter multiple children', () => (
    <div>
      <Element flexRow flexCenter>
        <ColorBlock />
        <ColorBlock />
        <ColorBlock />
      </Element>
    </div>
  ))
  .add('with flexColumn + flexCenter multiple children', () => (
    <div>
      <Element flexColumn flexCenter>
        <ColorBlock />
        <ColorBlock />
        <ColorBlock />
      </Element>
    </div>
  ))
  .add('with padding false and img child ', () => (
    <div withPadding={false}>
      <Img fullRow src={homeImg} alt="Some nice Maple" />
    </div>
  ))
  .add('with fullRow and img child and sibling Elements', () => (
    <div>
      <Element fullRow>
        <Img src={homeImg} alt="Some nice Maple" />
      </Element>
      <Element>
        <P>Hello Element 1</P>
      </Element>
      <Element>
        <P>Hello Element 1</P>
      </Element>
      <Element>
        <P>Hello Element 1</P>
      </Element>
    </div>
  ));
