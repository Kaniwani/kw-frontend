import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import PageWrapper from 'common/components/PageWrapper';
import Container from 'common/components/Container';
import Element from 'common/components/Element';
import H1 from 'common/components/H1';
import H2 from 'common/components/H2';
import A from 'common/components/A';
import P from 'common/components/P';
import PayPalDonate from './PayPalDonate';

import { purple } from 'common/styles/colors';

const Shortcut = styled.span`
  color: ${purple[4]};
  font-weight: 600;
`;

function AboutPage() {
  return (
    <div>
      <Helmet>
        <title>About</title>
        <meta name="description" content="Kaniwani About Page" />
      </Helmet>
      <PageWrapper>
        <Container>
          <Element>
            <H1>What’s this all about then?</H1>
          </Element>
          <Element>
            <P constrain>
              KaniWani is a companion website to{' '}
              <A href="http://www.wanikani.com" external>
                WaniKani
              </A>, an SRS tool for kanji and vocabulary memorization. We felt that WaniKani helped
              a lot with being able to recognize and read Kanji, but didn’t help enough when trying
              to recall words without the visual stimulation of the Kanji. KaniWani attempts to
              bridge that gap by using your WaniKani vocabulary to force you to do the opposite of
              what you are used to.
            </P>
          </Element>
        </Container>

        <Container flexRow flexWrap>
          <Element flex="1 0 320px">
            <H2>Moving Forward</H2>
            <P constrain>
              KaniWani starts off at your current WaniKani level, so you don’t have to go through
              all the previous levels unless you want to. Newly synced or unlocked words appear in
              your lesson queue. Complete lessons to introduce words into your regular review
              schedule.
            </P>
          </Element>
          <Element flex="1 0 320px">
            <H2>Unlocking the Past</H2>
            <P constrain>
              Manually unlock and relock previous levels in the vocabulary section, or even
              individual words to filter the vocabulary in your review schedule. You can further
              filter your reviews by WaniKani SRS rank on the settings page.
            </P>
          </Element>
          <Element flex="1 0 320px">
            <H2>Keyboard Warrior</H2>
            <P constrain>
              After answering a question, press <Shortcut>f</Shortcut> to open info panel,{' '}
              <Shortcut>spacebar</Shortcut> to cycle through the information panel detail levels,{' '}
              <Shortcut>w</Shortcut> to enable wrap-up mode, and <Shortcut>s</Shortcut> to add a new
              answer synonym.
            </P>
          </Element>
          <Element flex="1 0 320px">
            <H2>Next Time Gadget</H2>
            <P constrain>
              If your answer is marked incorrect, but you totally knew what it was, truly your
              honour. You can press <Shortcut>/</Shortcut> or <Shortcut>i</Shortcut> on your
              keyboard, or vehemently tap the <strong>x</strong> icon
              <strong> to ignore your failure as if nothing ever happened</strong>.
            </P>
            <P constrain>
              <em>However</em>, if your answer was correct, using this feature will
              <strong> mark your correct answer as incorrect and penalise appropriately</strong>.
              Use with caution!
            </P>
          </Element>
          <Element flex="1 0 320px">
            <H2>Follow WaniKani</H2>
            <P constrain>
              Automatically sync with WaniKani and unlock new levels here as you level up there.{' '}
              <strong>
                If you intend to cancel or suspend your WaniKani account, you should turn this
                feature off beforehand
              </strong>{' '}
              to prevent future syncing when your WaniKani level resets to level 3!.
            </P>
          </Element>
          <Element flex="1 0 320px">
            <H2>Science Repeat... Science!</H2>
            <P constrain>
              The algorithm is the same as WaniKani’s SRS, in that the more often you correctly
              answer a review, the less often you will see it — until it is burnt.
            </P>
          </Element>
          <Element flex="1 0 320px">
            <H2>Vocab Synergy</H2>
            <P constrain>
              Words in WaniKani that have the same <strong>identical</strong> base meaning but
              different readings get combined. For example, when you see the word “Arrow” you can
              answer either “や” or “やじるし”. If the meanings are slightly different but you
              consider your answer valid - you can add it as a KaniWani answer synonym during
              reviews or on the item’s vocabulary page.
            </P>
          </Element>
        </Container>

        <Container flexColumn flexCenter>
          <Element flexRow flexCenter>
            <P constrain textAlign="center">
              <em>Contributions gratefully accepted for ongoing development, webhosting, and </em>
              <span lang="ja">日本酒</span>.
            </P>
          </Element>
          <Element>
            <PayPalDonate />
          </Element>
        </Container>
      </PageWrapper>
    </div>
  );
}

export default AboutPage;
