import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import cuid from "cuid";

import { vocab } from "features/vocab/actions";
import { UI_DOMAIN, selectVocabLevelIds, selectVocabLevelsShouldLoad } from "./selectors";

import LevelLink from "./LevelLink";
import { List } from "./styles";

import Loader from "common/components/Loader";

LevelList.propTypes = {
  ids: PropTypes.array.isRequired,
};

export function LevelList({ ids }) {
  return <List>{ids.map((id) => <LevelLink key={cuid()} id={id} />)}</List>;
}

const mapStateToProps = (state) => ({
  ids: selectVocabLevelIds(state),
});

export function VocabLevelsContainer(props) {
  return (
    <Loader
      uiDomain={UI_DOMAIN}
      selectShouldLoad={selectVocabLevelsShouldLoad}
      load={vocab.levels.load.request}
      render={({ isLoading, lastLoad, Spinner }) =>
        isLoading && !lastLoad ? <Spinner /> : <LevelList {...props} />
      }
    />
  );
}

export default connect(mapStateToProps)(VocabLevelsContainer);
