import React from 'react';
import { storiesOf } from '@storybook/react';
import Ruby from 'base/Ruby';
import P from '../index';

storiesOf('base.P', module)
  .add('single', () => (
    <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</P>
  ))
  .add('multiple', () => (
    <div>
      <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</P>
      <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</P>
      <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure officiis repudiandae omnis!</P>
      <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo recusandae voluptatem atque totam, laboriosam at voluptates quam tempore aut, eaque aspernatur? Amet debitis dolorum, sunt distinctio cupiditate officia architecto omnis temporibus unde.</P>
    </div>
  ))
  .add('with lang="ja"', () => (
    <P lang="ja">２８日夜、群馬県渋川市にある焼き肉店から火が出て、消防によりますと、８人が病院に搬送され、このうち１人が意識不明の重体になっているということです。警察と消防は詳しい状況の確認を進めています</P>
  ))
  .add('with lang="ja" and nested Ruby', () => (
    <P lang="ja">
      ２８
      <Ruby furi="にち">日</Ruby>
      <Ruby furi="よる">夜</Ruby>
      、
      <Ruby furi="ぐんまけん">群馬県</Ruby>
      <Ruby furi="しぶかわし">渋川市</Ruby>
      にある
      <Ruby furi="やきにくてん">焼肉店</Ruby>
      から
      <Ruby furi="ひ">火</Ruby>
      が
      <Ruby furi="で">出</Ruby>
      て、
      <Ruby furi="しょうぼう">消防</Ruby>
      によりますと、
      <Ruby furi="はちにん">８人</Ruby>
      が
      <Ruby furi="びょういん">病院</Ruby>
      に
      <Ruby furi="はんそう">搬送</Ruby>
      され、このうち
      <Ruby furi="ひとり">１人</Ruby>
      が
      <Ruby furi="いしきふめい">意識不明</Ruby>
      の
      <Ruby furi="じゅうたい">重体</Ruby>
      になっているということです。
    </P>
  ))
  .add('multiple with lang="ja"', () => (
    <div>
      <P lang="ja">２８日夜、群馬県渋川市にある焼き肉店から火が出て、消防によりますと、８人が病院に搬送され、このうち１人が意識不明の重体になっているということです。警察と消防は詳しい状況の確認を進めています</P>
      <P lang="ja">２８日午後７時ごろ、群馬県渋川市にある焼き肉店から火が出ていると消防に通報がありました</P>

      <P lang="ja">火はおよそ４０分後に消し止められましたが、消防によりますと、８人が病院に搬送され、このうち１人は意識不明の重体になっているということです。消防によりますと、８人は２０代から６０代までの男女で、店員と客だということです</P>

      <P lang="ja">現場は、ＪＲ渋川駅の北側にあるビルが建ち並ぶ一角で、警察や消防がけがをした人の詳細や火事の状況を調べています</P>
    </div>
  ));
