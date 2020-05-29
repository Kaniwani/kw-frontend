import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UnmountClosed as Collapse } from 'react-collapse';
import { format } from 'date-fns';

import { grey } from 'common/styles/colors';
import { DATE_FORMAT } from 'common/constants';

import Toggle from 'common/components/Toggle';
import Icon from 'common/components/Icon';
import Button from 'common/components/Button';

import { selectAnnouncementById } from './selectors';

import { Article, Header, Title, Time } from './styles';

Announcement.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  pubDate: PropTypes.string.isRequired,
};

export function Announcement({ title, body, pubDate, ...props }) {
  const dateTime = format(pubDate, 'YYYY-MM-DD');
  const dateText = format(pubDate, DATE_FORMAT);
  // we trust the html provided by server, creation is behind admin wall
  const content = <div dangerouslySetInnerHTML={{ __html: body }} />; // eslint-disable-line react/no-danger
  return (
    <Toggle
      render={({ on, getTogglerProps }) => (
        <Article {...props}>
          <Button plainButton {...getTogglerProps()}>
            <Header borderActive={on}>
              <Title>{title}</Title>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Time dateTime={dateTime}>{dateText} </Time>
                <Icon name={on ? 'ARROW_UP' : 'ARROW_DOWN'} size="1.7rem" color={grey[2]} />
              </div>
            </Header>
          </Button>
          <Collapse isOpened={on}>{content}</Collapse>
        </Article>
      )}
    />
  );
}

export default connect(selectAnnouncementById)(Announcement);
