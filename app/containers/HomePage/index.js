import React from 'react';
import { getCurrentReviews } from 'shared/api';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InN5bjFAYmFyLmNvbSIsImV4cCI6MTQ5ODE1MTk4MywidXNlcl9pZCI6MywidXNlcm5hbWUiOiJzeW4xIn0.Dr0SSvS8cZ6Y0zk17U0C2fRBWFKFwenoQaqFiiRGGsM';

const body = {
  token,
  offset: 0,
  limit: 100,
};

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    getCurrentReviews(body)
      .then(res => console.log(res.results))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h1>HomePage!</h1>
      </div>
    );
  }
}
