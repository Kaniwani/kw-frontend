import React from 'react';
import { Helmet } from 'react-helmet';
import browserStackLogo from 'shared/assets/img/browserstack.svg';

import PageWrapper from 'base/PageWrapper';
import Container from 'base/Container';
import Element from 'base/Element';
import H1 from 'base/H1';
import H2 from 'base/H2';
import H3 from 'base/H3';
import A from 'base/A';
import P from 'base/P';
import Abbr from 'base/Abbr';

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
            <H1 >What’s this all about then?</H1>
            <P constrain>KaniWani is a companion website to <A href="http://www.wanikani.com" external>WaniKani</A>, an <Abbr title="Spaced Repetition System">SRS</Abbr> tool for kanji and vocabulary memorization. We felt that WaniKani helped a lot with being able to recognize and read Kanji, but didn’t help enough when trying to recall words without the visual stimulation of the Kanji. KaniWani attempts to bridge that gap by using your WaniKani vocabulary to force you to do the opposite of what you are used to.</P>
          </Element>
        </Container>

        <Container flex flexRow flexWrap>
          <Element flex="1 0 320px">
            <H2>Moving Forward</H2>
            <P constrain>KaniWani starts off at your current WK level, so you don’t have to go through all the previous levels unless you want to. Complete lessons to introduce words into your regular review schedule.</P>
          </Element>
          <Element flex="1 0 320px">
            <H2>Unlocking the Past</H2>
            <P constrain>Manually unlock and relock previous levels in the vocabulary section, or even individual words to filter the vocabulary in your review schedule. You can further filter your reviews by WaniKani SRS rank on the settings page.</P>
          </Element>
          <Element flex="1 0 320px">
            <H2>Keyboard Warrior</H2>
            <P constrain>After answering a question, press <strong>spacebar</strong> to cycle through the information panel detail levels, <strong>n</strong> to view and edit your notes, <strong>f</strong> to switch back to info, and <strong>s</strong> to add a new answer synonym.</P>
          </Element>
          <Element flex="1 0 320px">
            <H2>Next Time Gadget</H2>
            <P constrain>When your answer has been marked incorrect, but you totally knew what it was, like, 本気で！ You can press  <strong>/</strong> <small>(forward slash)</small> on your keyboard or vehemently tap the <strong>x</strong> icon to ignore your failure.</P>
          </Element>
          <Element flex="1 0 320px">
            <H2>Follow WaniKani</H2>
            <P constrain>Automatically sync with WaniKani and unlock new levels here as you level up there. If you wish to reset or suspend your WaniKani account, we recommend turning this feature <strong>off</strong> to prevent future syncing.</P>
          </Element>
          <Element flex="1 0 320px">
            <H2>Science Repeat... Science!</H2>
            <P constrain>The algorithm is the same as WaniKani’s SRS, in that the more often you correctly answer a review, the less often you will see it — until it is burnt.</P>
          </Element>
          <Element flex="1 0 320px">
            <H2>Vocab Synergy</H2>
            <P constrain>Words in WaniKani that have the same <strong>identical</strong> base meaning but different readings get combined. For example, when you see the word “Arrow” you can answer either “や” or “やじるし”. If the meanings are slightly different but you consider your answer valid - you can add it as a KW answer synonym during reviews or on the item’s vocabulary page.</P>
          </Element>
        </Container>

        <Container flex flexColumn flexCenter>
          <Element flex flexRow flexCenter>
            <P constrain textAlign="center">
              <em>Contributions gratefully accepted for ongoing development, webhosting, and <span lang="ja">日本酒</span>.</em>
            </P>
          </Element>
          <Element>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input
                type="hidden"
                name="encrypted"
                value="-----BEGIN PKCS7-----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-----END PKCS7-----"
              />
              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
              <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
            </form>
          </Element>
        </Container>
        <Container flex flexColumn flexCenter>
          <Element>
            <H3>Powered by</H3>
          </Element>
          <Element style={{ height: '3.5rem' }}>
            <A plainLink href="https://www.browserstack.com/" external>
              <img style={{ width: '100%', height: '100%' }} alt="BrowserStack Logo" src={browserStackLogo} />
            </A>
          </Element>
        </Container>

      </PageWrapper>
    </div>
  );
}

export default AboutPage;
