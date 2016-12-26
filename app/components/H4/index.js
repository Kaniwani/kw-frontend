import styled from 'styled-components';
import { fluidType } from 'shared/styles/utils';
import { minFontSize, mobileMod, desktopMod } from 'shared/styles/sizing';

// Modular scale
const mobileSize = +((mobileMod ** 1.7) * minFontSize).toPrecision(3);
const desktopSize = +((desktopMod ** 1.7) * minFontSize).toPrecision(3);

const H4 = styled.h4`
  ${fluidType(mobileSize, desktopSize)}
`;

export default H4;
