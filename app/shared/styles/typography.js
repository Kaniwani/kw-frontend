import { css } from 'styled-components';
import { mod1, mod2 } from 'shared/styles/sizing';
import { gutter } from 'shared/styles/layout';
import { fluidType } from 'shared/styles/utils';

/* 300, 400, 700 weights available */
export const ffBody = '"Liberation Sans", "Helvetica Neue", Helvetica, Arial, sans-serif';
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

export const headingRhythm = css`
  ${gutter()}
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.2;
  letter-spacing: -1px;
  &:not(:first-of-type) {
    margin-top: ${0.3 * mod2}em;
    margin-bottom: 0;
  }
`;

export const bodyRhythm = css`
  ${gutter()}
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.3;
`;

export const godzilla = fluidType(35, 90, 400, 2000);
export const giga = fluidType(23, 52, 400, 2000);
export const mega = fluidType(21, 46, 300, 2000);
export const kilo = fluidType(20, 44, 300, 2000);

// Headings
// h1
export const alpha = css`
  ${generateFontSize(3.8)}
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

export const delta = generateFontSize(1.10); // h4
export const epsilon = generateFontSize(0.75); // h5 & body
export const zeta = generateFontSize(0.6); // h6
// Smaller
export const milli = 'font-size: .85em;'; // <small>
export const micro = 'font-size: .7em;';
