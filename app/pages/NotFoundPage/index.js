import React from 'react';
import PropTypes from 'prop-types';

import Aux from 'common/components/Aux';
import A from 'common/components/A';
import Image from 'common/assets/img/404.png';
import Container from 'common/components/Container';
import PageWrapper from 'common/components/PageWrapper';

import { Wrapper, Title, Subtitle, Text, BackgroundImg } from './styles';

NotFoundPage.propTypes = {
  children: PropTypes.any,
};

NotFoundPage.defaultProps = {
  children: false,
};

function NotFoundPage({ children }) {
  return (
    <Wrapper>
      <PageWrapper>
        <Container>
          {children || (
            <Aux>
              <Title><span lang="ja">おろ〜</span> How did you get here?</Title>
              <Subtitle>Double-check the url is correct, and if you’re certain we mussed up then go ahead and send us a <A to="/contact">contact message</A>.</Subtitle>
              <Text><small>And remember, always be excellent to each other.</small></Text>
            </Aux>
          )}
        </Container>
      </PageWrapper>
      <BackgroundImg imgSrc={Image} />
    </Wrapper>
  );
}

export default NotFoundPage;
