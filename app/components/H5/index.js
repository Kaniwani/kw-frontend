import styled from 'styled-components';
import { fluidType } from 'shared/styles/utils';
import { minFontSize, mobileMod, desktopMod } from 'shared/styles/sizing';

// Modular scale
const mobileSize = +((mobileMod ** 1.5) * minFontSize).toPrecision(3);
const desktopSize = +((desktopMod ** 1.5) * minFontSize).toPrecision(3);

const H5 = styled.h5`
  ${fluidType(mobileSize, desktopSize)}
`;

export default H5;
