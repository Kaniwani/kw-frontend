import React from "react";
import PropTypes from "prop-types";
import cuid from "cuid";

import Aux from 'base/Aux';
import Ul from "base/Ul";
import Button from "base/Button";
import Announcement from "components/Announcement";

class AnnouncementList extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    items: this.props.items.slice(0, 8),
    old: this.props.items.slice(8),
  }

  showAll = () => this.setState(({ items, old }) => ({ items: [...items, ...old], old: [] }))

  renderList = (items) => (
    <Ul plainList>{items.map((item) => <Announcement key={cuid()} {...item} />)}</Ul>
  );

  render() {
    const { items, old } = this.state;
    return (
      <Aux>
        {this.renderList(items)}
        {!!old.length && <Button onClick={this.showAll}>View All</Button>}
      </Aux>
    );
  }
}

export default AnnouncementList;
