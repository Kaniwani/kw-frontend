import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Fixed, Absolute, Overlay, Flex } from 'rebass';

import landingBackground from 'common/assets/img/landing.svg';
import MultiLogin from 'features/landing';
import Element from 'common/components/Element';
import H1 from 'common/components/H1';
import P from 'common/components/P';
import A from 'common/components/A';
import IconButton from 'common/components/IconButton';
import Toggle from 'common/components/Toggle';

import { grey } from 'common/styles/colors';
import { Wrapper, Title, LandingBackgroundImg } from './styles';

LandingPage.propTypes = {
  children: PropTypes.any, // eslint-disable-line react/require-default-props
};

function LandingPage({ children }) {
  return (
    <Wrapper fullWidth>
      <header>
        <Title>KaniWani</Title>
      </header>
      <div>{children || <MultiLogin />}</div>
      <Toggle
        render={({ on, toggle }) => (
          <Fragment>
            <IconButton
              name="HELP"
              title="About KaniWani"
              color={grey[6]}
              size="2rem"
              onClick={toggle}
              style={{ position: 'absolute', top: '.4rem', right: '.4rem', zIndex: '10' }}
            />
            {on && (
              <div style={{ position: 'relative', zIndex: '10' }}>
                <Fixed top={0} right={0} bottom={0} left={0} onClick={toggle} />
                <Overlay width={['300px', '80vw', '720px']}>
                  <Absolute top={0} right={0} p={1}>
                    <IconButton name="CLOSE" title="Close" onClick={toggle} />
                  </Absolute>
                  <Flex
                    flex="0 1 280px"
                    flexDirection="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Element>
                      <H1>What’s this all about then?</H1>
                    </Element>
                    <Element>
                      <P constrain>
                        KaniWani is a companion website to{' '}
                        <A href="https://www.wanikani.com" external>
                          WaniKani
                        </A>
                        , an SRS tool for kanji and vocabulary memorization. We felt that WaniKani
                        helped a lot with being able to recognize and read Japanese, but didn’t help
                        enough when trying to recall or reproduce words without the visual cue of
                        seeing kanji. KaniWani attempts to bridge that gap by quizzing you from
                        English to Japanese using your WaniKani vocabulary, forcing you to do the
                        opposite of what you are used to.
                      </P>
                    </Element>
                  </Flex>
                </Overlay>
              </div>
            )}
          </Fragment>
        )}
      />
      <LandingBackgroundImg imgSrc={landingBackground} />
    </Wrapper>
  );
}

export default LandingPage;
