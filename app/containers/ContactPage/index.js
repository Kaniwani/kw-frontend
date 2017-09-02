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
import ContactForm from 'components/ContactForm';

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
          </Element>
          <Element>
            <H3>Hello there Good Sir, Gentle Madam, or Venerable Crabigator.</H3>
            <P constrain>
              <A href="https://github.com/tadgh/" external>Gary</A> and <A href="https://github.com/DJTB" external>Duncan</A> would love to hear from you. Send us your compliments, woes, dreams, and haikus. If you find a bug in the site, <Strike>smoosh it goood</Strike> let us know all about it! It’ll only take a moment, and we’ll get back to you shortly. Bonus 100 internet points if you include your <A href="http://whatbrowser.org" external>browser version</A> and <A href="http://whatsmyos.com/" external>operating system version</A> so we can accurately replicate the problem in testing. <br /><span lang="ja">ありがとうございます。</span>
            </P>
            <P constrain>You can join us on <A href="https://rauchg-slackin-iurjmkotad.now.sh/" external>Slack</A> for a quick response or just to have a chat. Otherwise, feel free to send us a contact email.</P>
          </Element>
        </Container>
        <Container>
          <ContactForm />
        </Container>
      </PageWrapper>
    </div>
  );
}

export default ContactPage;
