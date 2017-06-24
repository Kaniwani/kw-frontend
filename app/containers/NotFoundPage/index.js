import React from 'react';
import A from 'base/A';
import Image from 'shared/assets/img/404.png';
import Container from 'base/Container';
import PageWrapper from 'base/PageWrapper';

import { Wrapper, Title, Text, BackgroundImg } from './styles';

function NotFoundPage() {
  return (
    <Wrapper>
      <PageWrapper>
        <Container>
          <Title><span lang="ja">おろ〜</span> How did you get here?</Title>
          <Text>Double-check the url is correct, and if you’re certain we mussed up then go ahead and send us a <A to="/contact">contact message</A>.</Text>
          <Text><small>And remember, always be excellent to each other.</small></Text>
        </Container>
      </PageWrapper>
      <BackgroundImg imgSrc={Image} />
    </Wrapper>
  );
}

export default NotFoundPage;
