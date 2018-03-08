import VocabEntryPage from 'pages/VocabEntryPage';
import VocabDetailFixture from 'old/features/VocabDetail/__fixtures__/allProps.fixture';
import VocabStatsFixture from 'old/features/VocabStats/__fixtures__/allProps.fixture';

const { props: detailProps } = VocabDetailFixture;
const { props: statsProps } = VocabStatsFixture;

export default {
  component: VocabEntryPage,
  reduxState: {},
  url: `/vocabulary/entries/${detailProps.id}`,
  props: {
    ...detailProps,
    ...statsProps,
  },
};
