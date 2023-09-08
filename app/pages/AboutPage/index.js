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
import { purple } from 'common/styles/colors';
import PayPalDonate from './PayPalDonate';

const Shortcut = styled.span`
  color: ${purple[4]};
  font-weight: 600;
  &:before {
    content: '[';
    padding-right: 2px;
  }
  &:after {
    content: ']';
    padding-left: 2px;
  }
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
              KaniWani (KW) is a companion website to{' '}
              <A href="https://www.wanikani.com" external>
                WaniKani
              </A>{' '}
              (WK), an SRS tool for kanji and vocabulary memorization. We felt that WK helped a lot
              with being able to recognize and read Japanese, but didn’t help enough when trying to
              recall or reproduce words without the visual cue of seeing kanji. KW attempts to
              bridge that gap by quizzing you from English to Japanese using your WK vocabulary,
              forcing you to do the opposite of what you are used to.
            </P>
          </Container>

          <Container flex="1 1 500px">
            <H2>Moving Forward</H2>
            <P constrain>
              KW starts off at your current WK level, so you don’t have to go through all the
              previous levels unless you want to. Newly synced or unlocked words appear in your
              lesson queue. Complete lessons to introduce words into your regular review schedule.
            </P>
          </Container>

          <Container flex="1 1 500px">
            <H2>Unlocking the Past</H2>
            <P constrain>
              Manually unlock and relock previous levels in the vocabulary section, or even
              individual words to filter the vocabulary in your review schedule. Locking a level
              completely resets the KW SRS rank for all the contained words. Individually disabling
              a word will filter it from your reviews and you can re-enable it later to resume
              progress. You can also further filter your reviews by WK SRS rank on the settings
              page.
            </P>
          </Container>

          <Container flex="1 1 500px">
            <H2>Follow WaniKani</H2>
            <P constrain>
              This setting will automatically sync with WK and unlock <strong>new</strong> levels
              here as you level up there.{' '}
              <strong>
                If you intend to cancel or suspend your WK account, you should turn this feature off
                beforehand
              </strong>{' '}
              to prevent future syncing when your WK level resets to level 3!.
            </P>
          </Container>

          <Container flex="1 1 500px">
            <H2>Science Repeat... Science!</H2>
            <P constrain>
              The algorithm is the same as WaniKani’s SRS, using the same time intervals between
              ranks. The more often you correctly answer a review, the less often you will see it —
              until it is burnt.
            </P>
          </Container>

          <Container flex="1 1 500px">
            <H2>Keyboard Warrior</H2>
            <P constrain>
              After answering a question, press <Shortcut>f</Shortcut> to open the info panel,{' '}
              <Shortcut>spacebar</Shortcut> to cycle through the information panel detail levels,{' '}
              <Shortcut>w</Shortcut> to enable wrap-up mode, and <Shortcut>s</Shortcut> to add a new
              answer synonym. If you have <em>Auto Advance</em> enabled, you can cancel it by
              pressing <Shortcut>c</Shortcut> or tapping inside the info panel.
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
              Many WK words have very similar meanings. To alleviate this, if you add{' '}
              <strong>meaning synoynms on WK</strong> they will appear as part of the KW meaning /
              quiz question. You can also add <strong>answer synonyms on KW</strong> as acceptable
              answers during your reviews or on the vocabulary entry page. The review screen also
              contains a mora count in the bottom left corner of the question. For example, the
              question for Girl would display 5 to hint that the answer is (女の子) おんなのこ and
              not (少女) しょうじょ which only has 3 morae [しょ, う, じょ].
            </P>
          </Container>

          <Container flex="1 1 500px">
            <H2>Dude, where’s my changes?</H2>
            <P constrain>
              It would be uncouth of us to hammer WK constantly checking for potential changes, so
              we only sync a few times over a 24 hour period. This means, you may have to wait up to
              12 hours for newly unlocked vocab or synonym changes to appear. Patience, young
              durtle.
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
