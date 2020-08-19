import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import PageWrapper from 'common/components/PageWrapper';
import Container from 'common/components/Container';
import Element from 'common/components/Element';
import H2 from 'common/components/H2';
import P from 'common/components/P';
import A from 'common/components/A';
import Strike from 'common/components/Strike';
import Contact from 'features/contact';

ContactPage.propTypes = {};

function ContactPage() {
  return (
    <Fragment>
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Kaniwani Contact Page" />
      </Helmet>
      <PageWrapper>
        <Container>
          <Element>
            <H2>Hello there Good Sir, Gentle Madam, or Venerable Crabigator.</H2>
          </Element>
          <Element>
            <P constrain>
              <A href="https://github.com/tadgh/" external>
                Gary
              </A>{' '}
              and{' '}
              <A href="https://github.com/DJTB" external>
                Duncan
              </A>{' '}
              would love to hear from you. Send us your compliments, woes, dreams, and haikus. If
              you find a bug in the site, <Strike>smoosh it goood</Strike> let us know all about it!
              It’ll only take a moment, and we’ll get back to you shortly. Bonus 💯 internet points
              if you include your{' '}
              <A href="https://www.whatsmybrowser.org" external>
                browser version and operating system
              </A>{' '}
              so we can accurately replicate the problem in testing.
              <br />
              <span lang="ja">ありがとうございます。</span>
            </P>
          </Element>
          <Element>
            <P constrain>
              You can join us on{' '}
              <A href="https://rauchg-slackin-iurjmkotad.now.sh/" external>
                Slack
              </A>{' '}
              for a quick response or just to have a chat. Otherwise, feel free to send us a contact
              email.
            </P>
          </Element>
        </Container>
        <Container>
          <Contact />
        </Container>
      </PageWrapper>
    </Fragment>
  );
}

export default ContactPage;
