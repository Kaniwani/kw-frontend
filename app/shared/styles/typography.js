import { css } from 'styled-components';
import { mod1, mod2 } from 'shared/styles/sizing';
import { fluidType } from 'shared/styles/utils';

/* 300, 400, 700 weights available */
export const ffBody = '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif';
export const ffHeading = '"Ubuntu", Helvetica, Arial, sans-serif';
export const ffJapanese = '"Hiragino Kaku Gothic Pro", "Takao Pゴシック", "Meiryo", "Yu Gothic", "ヒラギノ角ゴ Pro W3", "メイリオ", "Osaka", "MS PGothic", "ＭＳ Ｐゴシック", sans-serif';

// Modular scale
export const minFontSize = 14;
export const minFontRange = 600; // start scaling
export const maxFontRange = 1800; // stop scaling

// Helpers
const modFontSize = (mod, exponent, minfont) => +((mod ** exponent) * minfont).toPrecision(3);
const generateFontSize = (exponent) => {
  const mobileSize = modFontSize(mod1, exponent, minFontSize);
  const desktopSize = modFontSize(mod2, exponent, minFontSize);
  return fluidType(mobileSize, desktopSize, minFontRange, maxFontRange);
};

export const headingRhythm = `
  line-height: 1.2;
  letter-spacing: -1px;
  margin-top: 0;
  margin-bottom: 0;
  &:not(:first-child) {
    margin-top: ${0.5 * mod2}em;
    margin-bottom: 0;
  }
`;

export const bodyRhythm = `
  line-height: 1.4;
  margin-top: 0;
  margin-bottom: 0;
  &:not(:first-child) {
    margin-top: .4em;
    margin-bottom: 0;
  }
`;

export const giga = fluidType(22, 48, 300, 2000);
export const mega = fluidType(21, 44, 300, 2000);
export const kilo = fluidType(20, 40, 300, 2000);

// Headings
// h1
export const alpha = css`
  ${generateFontSize(4)}
  letter-spacing: -0.04em;
`;
// h2
export const beta = css`
  ${generateFontSize(3)}
  letter-spacing: -0.03em;
`;
// h3
export const gamma = css`
  ${generateFontSize(2)}
  letter-spacing: -0.02em;
`;
export const delta = generateFontSize(1);  // h4
export const epsilon = generateFontSize(0.75);  // h5 & body
export const zeta = generateFontSize(0.6);  // h6
// Smaller
export const milli = 'font-size: .85em;'; // <small>
export const micro = 'font-size: .7em;';
