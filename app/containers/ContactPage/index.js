import React from 'react';
import { Helmet } from 'react-helmet';

import PageWrapper from 'base/PageWrapper';
import Container from 'base/Container';
import Element from 'base/Element';
import H1 from 'base/H1';
import H3 from 'base/H3';
import P from 'base/P';
import A from 'base/A';
import Strike from 'base/Strike';

function ContactPage() {
  return (
    <div>
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Kaniwani Contact Page" />
      </Helmet>
      <PageWrapper>
        <Container>
          <Element>
            <H1 >Drop us a line <small lang="ja">私たちに手紙を送ります</small></H1>
            <H3>Hello there Good Sir, Gentle Madam, or Venerable Crabigator.</H3>
            <P constrain>
              <A href="https://github.com/tadgh/" external>Gary</A> and <A href="https://github.com/DJTB" external>Duncan</A> would love to hear from you. Send us your compliments, woes, dreams, and haikus. If you find a bug in the site, <Strike>smoosh it goood</Strike> send us a message below! It’ll only take a moment, and we’ll get back to you shortly. Bonus 100 internet points to you if you include your <A href="http://whatbrowser.org" external>browser version</A> and <A href="http://whatsmyos.com/" external>operating system version</A> so we can accurately replicate the problem in testing. <small lang="ja">ありがとうございます。</small>
            </P>
            <P constrain>You can join us on <A href="https://rauchg-slackin-iurjmkotad.now.sh/" external>Slack</A> for a quick response or just to have a chat. Otherwise, use the email contact form below.</P>
          </Element>
          <Element>
            <H1>Contact Form Here!</H1>
          </Element>
        </Container>
      </PageWrapper>
    </div>
  );
}

export default ContactPage;
