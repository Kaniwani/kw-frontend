import styled from 'styled-components';
import { fluidType } from 'shared/styles/utils';
import { minFontSize, mobileMod, desktopMod } from 'shared/styles/sizing';

// Modular scale
const mobileSize = +((mobileMod ** 2) * minFontSize).toPrecision(3);
const desktopSize = +((desktopMod ** 2) * minFontSize).toPrecision(3);

const H3 = styled.h3`
  ${fluidType(mobileSize, desktopSize)}
`;

export default H3;
