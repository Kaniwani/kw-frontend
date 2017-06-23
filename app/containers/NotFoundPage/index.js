import React from 'react';
import A from 'base/A';
import Image from 'shared/assets/img/404.png';
import PageWrapper from 'layouts/PageWrapper';
import Container from 'layouts/Container';

import { Title, Text, BackgroundImg } from './styles';

function NotFoundPage() {
  return (
    <PageWrapper fullWidth>
      <Container>
        <Title><span lang="ja">おろ〜</span> How did you get here?</Title>
        <Text>Double-check the url is correct, and if you’re certain we mussed up then go ahead and send us a <A to="/contact">contact message</A>.</Text>
        <Text><small>And remember, always be excellent to each other.</small></Text>
      </Container>
      <BackgroundImg imgSrc={Image} />
    </PageWrapper>
  );
}

export default NotFoundPage;
