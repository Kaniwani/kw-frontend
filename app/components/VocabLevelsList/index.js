import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, branch, renderComponent, shouldUpdate } from 'recompose';
import { isEqual } from 'lodash';

import { selectLevelIds } from 'components/App/selectors';
import LoadingCrabigator from 'components/LoadingCrabigator';
import VocabLevel from 'components/VocabLevel';
import { Ul } from './styles';

VocabLevelsList.propTypes = {
  levelIds: PropTypes.array.isRequired,
};

const enhance = compose(
  branch(({ levelIds }) => !levelIds.length, renderComponent(LoadingCrabigator)),
  shouldUpdate((props, nextProps) => !isEqual(props.levelIds, nextProps.levelIds)),
);

function VocabLevelsList({ levelIds }) {
  return (
    <Ul>{levelIds.map((id) => <VocabLevel key={cuid()} id={id} />)}</Ul>
  );
}

const mapStateToProps = createStructuredSelector({
  levelIds: selectLevelIds,
});

export default connect(mapStateToProps)(enhance(VocabLevelsList));
