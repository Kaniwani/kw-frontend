import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PageWrapper from 'base/PageWrapper';
import Container from 'base/Container';

import { selectLastWkSyncDate } from 'shared/selectors';
import LastWkSync from 'pages/HomePage/LastWkSync';
import SettingsForm from './SettingsForm';
import AccountForm from './AccountForm';

function SettingsPage({ lastWkSyncDate }) {
  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Kaniwani Settings Page" />
      </Helmet>
      <PageWrapper>
        {/* FIXME: make completely separate forms (quiz, vocab, account etc) */}
        {/* FIXME: use flat state from profile settings, and only pass down relevant props */}
        {/* FIXME: so we can simply camelcase/snakecase in serializers */}
        <Container>
          <SettingsForm />
        </Container>
        <Container>
          <AccountForm />
        </Container>
        <Container>
          <LastWkSync lastWkSyncDate={lastWkSyncDate} />
        </Container>
      </PageWrapper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  lastWkSyncDate: selectLastWkSyncDate(state),
});

export default connect(mapStateToProps)(SettingsPage);
