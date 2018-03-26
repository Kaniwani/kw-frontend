import { titleCase } from 'voca';
import { SRS_COLORS } from 'common/styles/colors';

const formatSrsCounts = (data = {}) => {
  const entries = Object.entries(data);
  if (!entries.length) {
    return [];
  }
  return entries.map(([name, value], index) => ({
    name: titleCase(name),
    value: +value,
    fill: Object.values(SRS_COLORS)[index],
  }));
};

export default formatSrsCounts;
