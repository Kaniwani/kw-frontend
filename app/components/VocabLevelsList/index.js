import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, branch, renderNothing, shouldUpdate } from 'recompose';
import isEqual from 'lodash/isEqual';

import { selectLevelIds } from 'containers/App/selectors';
import VocabLevel from 'components/VocabLevel';
import { Ul } from './styles';

VocabLevelsList.propTypes = {
  levelIds: PropTypes.array.isRequired,
};

const enhance = compose(
  branch(({ levelIds }) => levelIds.length < 0, renderNothing),
  shouldUpdate((props, nextProps) => !isEqual(props.levelIds, nextProps.levelIds)),
);

function VocabLevelsList({ levelIds }) {
  return (
    <Ul>
      {levelIds.map((id) => <VocabLevel key={cuid()} id={id} />)}
    </Ul>
  );
}

const mapStateToProps = createStructuredSelector({
  levelIds: selectLevelIds,
});

export default connect(mapStateToProps)(enhance(VocabLevelsList));
