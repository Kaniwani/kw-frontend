import React from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import { shouldUpdate } from "recompose";

import { Helmet } from "react-helmet";
import PageWrapper from "base/PageWrapper";
import Container from "base/Container";
import H3 from "base/H3";
import A from "base/A";
import VocabPageHeader from "containers/VocabPageHeader";
import VocabList from "components/VocabList";
import LoadingCrabigator from "components/LoadingCrabigator";

View.propTypes = {
  reviewIds: PropTypes.array.isRequired,
  levelId: PropTypes.PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isLocked: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  cardsExpanded: PropTypes.bool.isRequired,
  toggleCardsExpanded: PropTypes.func.isRequired,
};

function View({
  levelId,
  reviewIds,
  isLocked,
  isLoading,
  cardsExpanded,
  toggleCardsExpanded,
}) {
  const PAGE_TITLE = `Vocabulary: Level ${levelId}`;
  return (
    <div>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={`Kaniwani ${PAGE_TITLE}`} />
      </Helmet>
      <PageWrapper>
        <VocabPageHeader
          pageTitle={PAGE_TITLE}
          cardsExpanded={cardsExpanded}
          toggleCardsExpanded={toggleCardsExpanded}
          withVocabListToggle
        />
        <Container>
          {isLocked &&
            !isLoading && (
              <H3>
                Level is locked! Unlock it in <A to="/vocabulary">Vocabulary Levels</A>
              </H3>
            )}
          {!isLocked && <VocabList ids={reviewIds} isExpanded={cardsExpanded} />}
          {!isLocked && isLoading && <LoadingCrabigator />}
          {!isLocked &&
            !isLoading &&
            reviewIds.length < 1 && (
              <H3>
                All entries hidden. Check your WaniKani SRS filtering in{" "}
                <A to="/settings">Settings</A>
              </H3>
            )}
        </Container>
      </PageWrapper>
    </div>
  );
}

export default shouldUpdate((props, nextProps) => !isEqual(props, nextProps))(View);
