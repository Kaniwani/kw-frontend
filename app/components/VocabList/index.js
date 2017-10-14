import React from 'react';
import PropTypes from 'prop-types';
import { TransitionMotion, spring } from 'react-motion';
import ReactTooltip from 'react-tooltip';

import { isEqual } from 'lodash';
import * as COLORS from 'shared/styles/colors';

import LoadingCrabigator from 'components/LoadingCrabigator';
import VocabCard from 'components/VocabCard';
import VocabChip from 'components/VocabChip';
import { Ul } from './styles';

class VocabList extends React.PureComponent {
  static propTypes = {
    ids: PropTypes.array.isRequired,
    color: PropTypes.oneOf(Object.keys(COLORS)),
    prevLoaded: PropTypes.bool.isRequired,
    isExpanded: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    color: 'purple',
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  // componentDidUpdate(prevProps) {
  //   console.log('vocabChip, componentDidUpdate', { props: this.props, prevProps });
  //   const switchedToCompact = (!this.props.isExpanded) && prevProps.isExpanded;
  //   if (switchedToCompact) {
  //     ReactTooltip.rebuild();
  //   }
  // }

  getDefaultStyles = () => this.props.ids.map((id) => ({
    data: { id },
    key: `${id}`,
    style: { opacity: 0 },
  }))

  getStyles = () => this.props.ids.map((id) => ({
    data: { id },
    key: `${id}`,
    style: {
      opacity: spring(1),
    },
  }))

  willEnter() {
    return {
      opacity: 0,
    };
  }

  willLeave() {
    return {
      opacity: spring(0),
    };
  }

  render() {
    const { prevLoaded, ids, color, isExpanded } = this.props;

    if (!prevLoaded && (ids && !ids.length)) {
      return <LoadingCrabigator />;
    }

    return (
      <div>
        {!isExpanded && (
          <ReactTooltip id="vocabChipTip" className="vocab-tip" html />
        )}
        <TransitionMotion
          defaultStyles={this.getDefaultStyles()}
          styles={this.getStyles()}
          willLeave={this.willLeave}
          willEnter={this.willEnter}
        >
          {(styles) => (
            <Ul isExpanded={isExpanded}>
              {styles.map(({ key, style, data: { id } }) => isExpanded ? (
                <VocabCard
                  id={id}
                  key={key}
                  color={color}
                  style={style}
                />
              ) : (
                <VocabChip
                  id={id}
                  key={key}
                  color={color}
                  toolTipId="vocabChipTip"
                  style={style}
                />
              ))}
            </Ul>
          )}
        </TransitionMotion>
      </div>
    );
  }
}

export default VocabList;
