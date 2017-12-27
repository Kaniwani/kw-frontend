import { titleCase } from "voca";
import { SRS_COLORS } from "common/styles/colors";

const formatSrsCounts = (data) =>
  Object.entries(data).map(([name, value], index) => ({
    name: titleCase(name),
    value: +value,
    fill: Object.values(SRS_COLORS)[index],
  }));

export default formatSrsCounts;
