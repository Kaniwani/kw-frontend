import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withStateHandlers } from 'recompose';
import { Collapse } from 'react-collapse';
import format from 'date-fns/format';

import { greyLight } from 'shared/styles/colors';
import { DATE_FORMAT } from 'shared/constants';

import Icon from 'components/Icon';

import { Article, Header, Title, TitleText, Toggle, Time } from './styles';

Announcement.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  pubDate: PropTypes.instanceOf(Date).isRequired,
  isOpened: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};

function Announcement({
  toggleOpen, isOpened, title, body, pubDate,
}) {
  return (
    <Article>
      <Header>
        <Toggle plainButton onClick={toggleOpen}>
          <Title>
            <TitleText>{title}</TitleText>
            <Time dateTime={format(pubDate, 'YYYY-MM-DD')}>
              {format(pubDate, DATE_FORMAT)}{' '}
            </Time>
          </Title>
          <Icon
            name={isOpened ? 'ARROW_UP' : 'ARROW_DOWN'}
            size="2rem"
            color={greyLight}
          />
        </Toggle>
      </Header>
      <Collapse isOpened={isOpened}>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </Collapse>
    </Article>
  );
}

export default compose(
  withStateHandlers(
    { isOpened: false },
    { toggleOpen: ({ isOpened }) => () => ({ isOpened: !isOpened }) }
  ),
  pure
)(Announcement);
