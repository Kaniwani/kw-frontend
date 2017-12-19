import React from "react";
import PropTypes from "prop-types";
import { UnmountClosed as Collapse } from "react-collapse";
import format from "date-fns/format";

import { greyLight } from "shared/styles/colors";
import { DATE_FORMAT } from "shared/constants";

import Toggle from "components/Toggle";
import Icon from "components/Icon";
import Button from "base/Button";

import { Article, Header, Title, TitleText, Time } from "./styles";

Announcement.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  pubDate: PropTypes.instanceOf(Date).isRequired,
};

function Announcement({
  title, body, pubDate, ...props
}) {
  const dateTime = format(pubDate, "YYYY-MM-DD");
  const dateText = format(pubDate, DATE_FORMAT);
  // we trust the html provided by server, creation is behind admin wall
  const content = <div dangerouslySetInnerHTML={{ __html: body }} />; // eslint-disable-line react/no-danger
  return (
    <Toggle
      render={({ on, getTogglerProps }) => (
        <Article {...props}>
          <Button plainButton {...getTogglerProps()}>
            <Header borderActive={on}>
              <Title>
                <TitleText>{title}</TitleText>
                <Time dateTime={dateTime}>
                  {dateText}{" "}
                </Time>
              </Title>
              <Icon
                inline={false}
                name={on ? "ARROW_UP" : "ARROW_DOWN"}
                size="1.8rem"
                color={greyLight}
              />
            </Header>
          </Button>
          <Collapse isOpened={on} springConfig={{ stiffness: 205, damping: 22 }}>
            {content}
          </Collapse>
        </Article>
      )}
    />
  );
}

export default Announcement;
