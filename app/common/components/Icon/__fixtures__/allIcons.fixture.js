import React from "react";
import cuid from "cuid";
import Container from "common/components/Container";
import Element from "common/components/Element";
import Icon from "common/components/Icon";
import { ICONS } from "common/components/Icon/constants";

const component = ({ children }) => <div>{children}</div>;
component.displayName = "Icon Gallery";

const icons = Object.keys(ICONS).map((name) => (
  <Container key={cuid()}>
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
