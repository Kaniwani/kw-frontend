import React from 'react';
import PropTypes from 'prop-types';
import { distanceInWordsToNow } from 'date-fns';

import Container from 'common/components/Container';
import H2 from 'common/components/H2';
import P from 'common/components/P';

LastActivity.propTypes = {
  date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])]),
};

LastActivity.defaultProps = {
  date: false,
};

export function LastActivity({ date }) {
  return (
    <div style={{ marginTop: '20px' }}>
      {date !== false ? (
        <Container>
          <P>
            {'Last session activity: '}
            {`${distanceInWordsToNow(date, {
              includeSeconds: true,
            })} ago.`}
          </P>
        </Container>
      ) : (
        <Container>
          <H2>No recent history.</H2>
        </Container>
      )}
    </div>
  );
}

export default LastActivity;
