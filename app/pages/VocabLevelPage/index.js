import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from 'shared/actions';
import {
  selectIdFromMatch,
  makeSelectLevelReviews,
  makeSelectLevelLocked,
  makeSelectLevelLoading,
} from 'shared/selectors';

import View from './View';

export class VocabLevelPage extends React.PureComponent {
  static propTypes = {
    loadLevelReviews: PropTypes.func.isRequired,
    levelId: PropTypes.PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    reviewIds: PropTypes.array,
    isLocked: PropTypes.bool,
    isLoading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    reviewIds: [],
    isLocked: null,
  };

  state = {
    cardsExpanded: true,
  };

  componentWillMount() {
    const { loadLevelReviews, levelId } = this.props;
    loadLevelReviews({ id: levelId });
  }

  toggleCardsExpanded = () => {
    this.setState({ cardsExpanded: !this.state.cardsExpanded });
  };

  render() {
    return (
      this.props.isLocked != null && (
        <View
          {...this.props}
          {...this.state}
          toggleCardsExpanded={this.toggleCardsExpanded}
        />
      )
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = selectIdFromMatch(props);
  return {
    levelId: id,
    reviewIds: makeSelectLevelReviews(id)(state),
    isLocked: makeSelectLevelLocked(id)(state),
    isLoading: makeSelectLevelLoading(id)(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadLevelReviews: (payload) => dispatch(actions.level.load.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelPage);
