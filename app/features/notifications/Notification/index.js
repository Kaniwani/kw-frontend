import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'common/components/Icon';

import { Wrapper, IconWrapper, Content, Close } from './styles';

export class Notification extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    duration: PropTypes.number,
    handleDismiss: PropTypes.func.isRequired,
  };

  static defaultProps = {
    duration: 0,
  };

  componentDidMount() {
    const { handleDismiss, id, duration } = this.props;
    if (duration !== 0) {
      setTimeout(() => {
        handleDismiss(id);
      }, duration);
    }
  }

  getIconName = (type) =>
    ({
      SUCCESS: 'CHECK_CIRCLE',
      INFO: 'INFO',
      ERROR: 'BUG',
      WARNING: 'ATTENTION',
    }[type]);

  render() {
    const { handleDismiss, duration, content, type, id } = this.props;

    return (
      <Wrapper type={type}>
        <IconWrapper>
          <Icon name={this.getIconName(type)} size="1.2rem" />
        </IconWrapper>
        <Content>{content}</Content>
        {!duration && <Close onClick={() => handleDismiss(id)} />}
      </Wrapper>
    );
  }
}

export default Notification;
