import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import PageWrapper from 'common/components/PageWrapper';
import Container from 'common/components/Container';
import Element from 'common/components/Element';
import H2 from 'common/components/H2';
import P from 'common/components/P';
import A from 'common/components/A';
import Strike from 'common/components/Strike';

ContactPage.propTypes = {};

function ContactPage() {
  return (
    <>
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
              To get in contact with us about anything, simply{' '}
              <A href="mailto:garygrantgraham+kw@gmail.com;duncan.bay+kw@gmail.com?subject=KaniWani%20Enquiry">
                send an email to Gary & Duncan
              </A>
            </P>
          </Element>
        </Container>
      </PageWrapper>
    </>
  );
}

export default ContactPage;
