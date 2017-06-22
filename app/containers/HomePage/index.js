import React from 'react';
import { getUserProfile } from 'shared/api';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InN5bjFAYmFyLmNvbSIsImV4cCI6MTQ5ODE1MTk4MywidXNlcl9pZCI6MywidXNlcm5hbWUiOiJzeW4xIn0.Dr0SSvS8cZ6Y0zk17U0C2fRBWFKFwenoQaqFiiRGGsM';

const body = {
  token,
};

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    getUserProfile(body)
      .then(res => console.log(res))
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
