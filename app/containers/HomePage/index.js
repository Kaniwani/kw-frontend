import React from 'react';
import { getUserProfile, getCurrentReviews } from 'shared/api';
import { userProfileSerializer, stubbedReviewEntriesSerializer, reviewEntriesSerializer } from 'shared/serializers';

import PageWrapper from 'base/PageWrapper';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InN5bjFAYmFyLmNvbSIsImV4cCI6MTQ5ODE1MTk4MywidXNlcl9pZCI6MywidXNlcm5hbWUiOiJzeW4xIn0.Dr0SSvS8cZ6Y0zk17U0C2fRBWFKFwenoQaqFiiRGGsM';

const body = {
  token,
};

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    user: {},
    dashboard: {},
    settings: {},
    reviews: [],
  }

  componentDidMount() {
    getUserProfile(body)
      .then((res) => {
        this.setState(userProfileSerializer(res));
      }) // eslint-disable-line no-console
      .catch(err => console.error(err)); // eslint-disable-line no-console

    getCurrentReviews(body)
      .then((res) => {
        console.log(res);
        this.setState({ reviews: stubbedReviewEntriesSerializer(res) });
      }) // eslint-disable-line no-console
      .catch(err => console.error(err)); // eslint-disable-line no-console
  }

  render() {
    return (
      <PageWrapper>
        <h1>HomePage!</h1>
        <pre><code>{JSON.stringify(this.state, null, 2)}</code></pre>
      </PageWrapper>
    );
  }
}
