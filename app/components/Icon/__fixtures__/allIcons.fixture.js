import React from "react";
import uuid from "uuid";
import Container from "base/Container";
import Element from "base/Element";
import Icon from "components/Icon";
import { ICONS } from "components/Icon/constants";

const component = ({ children }) => <div>{children}</div>;
component.displayName = "Icon Gallery";

const icons = Object.keys(ICONS).map((name) => (
  <Container key={uuid()}>
    <Element style={{ fontSize: ".8em" }}>{name}</Element>
    <Element>
      <Icon name={name} size="2.5rem" />
    </Element>
  </Container>
));

export default {
  component,
  children: icons,
};
