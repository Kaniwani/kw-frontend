import React, { PropTypes } from 'react';

export class ReviewPage extends React.Component {
  render() {
    return React.Children.only(this.props.children);
  }
}

ReviewPage.propTypes = {
  children: PropTypes.element,
};

export default ReviewPage;
