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
        <Container flexRow flexWrap>
          <Container flex="10 0 100%">
            <H1>What’s this all about then?</H1>
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
          </Container>

          <Container flex="1 1 500px">
            <H2>Moving Forward</H2>
            <P constrain>
              KaniWani starts off at your current WaniKani level, so you don’t have to go through
              all the previous levels unless you want to. Newly synced or unlocked words appear in
              your lesson queue. Complete lessons to introduce words into your regular review
              schedule.
            </P>
          </Container>
          <Container flex="1 1 500px">
            <H2>Unlocking the Past</H2>
            <P constrain>
              Manually unlock and relock previous levels in the vocabulary section, or even
              individual words to filter the vocabulary in your review schedule. Locking a level
              completely resets the (KaniWani) SRS rank for all the contained words. Individually
              disabling a word will filter it from your reviews and you can re-enable it later to
              resume progress. You can also further filter your reviews by WaniKani SRS rank on the
              settings page.
            </P>
          </Container>
          <Container flex="1 1 500px">
            <H2>Follow WaniKani</H2>
            <P constrain>
              This setting will automatically sync with WaniKani and unlock <strong>new</strong>{' '}
              levels here as you level up there.{' '}
              <strong>
                If you intend to cancel or suspend your WaniKani account, you should turn this
                feature off beforehand
              </strong>{' '}
              to prevent future syncing when your WaniKani level resets to level 3!.
            </P>
          </Container>

          <Container flex="1 1 500px">
            <H2>Science Repeat... Science!</H2>
            <P constrain>
              The algorithm is the same as WaniKani’s SRS, in that the more often you correctly
              answer a review, the less often you will see it — until it is burnt.
            </P>
          </Container>

          <Container flex="1 1 500px">
            <H2>Keyboard Warrior</H2>
            <P constrain>
              After answering a question, press <Shortcut>f</Shortcut> to open info panel,{' '}
              <Shortcut>spacebar</Shortcut> to cycle through the information panel detail levels,{' '}
              <Shortcut>w</Shortcut> to enable wrap-up mode, and <Shortcut>s</Shortcut> to add a new
              answer synonym.
            </P>
          </Container>
          <Container flex="1 1 500px">
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
          </Container>
          <Container flex="1 1 500px">
            <H2>Girl, Little Girl, Young Lady, Arggh!</H2>
            <P constrain>
              Many WaniKani words have very similar meanings. To alleviate this, if you add{' '}
              <strong>meaning synoynms on WaniKani</strong> they will appear as part of the KaniWani
              meaning. You can also add <strong>answer synonyms on KaniWani</strong> as acceptable
              answers during your reviews or on the vocabulary entry page.
            </P>
          </Container>
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
