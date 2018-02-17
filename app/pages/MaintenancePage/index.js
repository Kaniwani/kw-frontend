import React from 'react';
import PropTypes from 'prop-types';

import Aux from 'common/components/Aux';
import Image from 'common/assets/img/maintenance.png';
import Container from 'common/components/Container';
import PageWrapper from 'common/components/PageWrapper';

import { Wrapper, Title, Subtitle, BackgroundImg } from './styles';

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
              <Title>
                Maintenance!? <span lang="ja">絶望した！</span>
              </Title>
              <Subtitle>ちょっと待って下さい...</Subtitle>
            </Aux>
          )}
        </Container>
      </PageWrapper>
      <BackgroundImg imgSrc={Image} />
    </Wrapper>
  );
}

export default NotFoundPage;
