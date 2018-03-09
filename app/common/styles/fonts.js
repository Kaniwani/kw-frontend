import { css } from 'styled-components';

import UbuntuL from '../assets/fonts/Ubuntu-L-subset.woff';
import UbuntuL2 from '../assets/fonts/Ubuntu-L-subset.woff2';
import UbuntuLI from '../assets/fonts/Ubuntu-LI-subset.woff';
import UbuntuLI2 from '../assets/fonts/Ubuntu-LI-subset.woff2';
import UbuntuR from '../assets/fonts/Ubuntu-R-subset.woff';
import UbuntuR2 from '../assets/fonts/Ubuntu-R-subset.woff2';
import UbuntuRI from '../assets/fonts/Ubuntu-RI-subset.woff';
import UbuntuRI2 from '../assets/fonts/Ubuntu-RI-subset.woff2';
import UbuntuM from '../assets/fonts/Ubuntu-M-subset.woff';
import UbuntuM2 from '../assets/fonts/Ubuntu-M-subset.woff2';
import UbuntuMI from '../assets/fonts/Ubuntu-MI-subset.woff';
import UbuntuMI2 from '../assets/fonts/Ubuntu-MI-subset.woff2';
import UbuntuB from '../assets/fonts/Ubuntu-B-subset.woff';
import UbuntuB2 from '../assets/fonts/Ubuntu-B-subset.woff2';
import UbuntuBI from '../assets/fonts/Ubuntu-BI-subset.woff';
import UbuntuBI2 from '../assets/fonts/Ubuntu-BI-subset.woff2';
import UbuntuC from '../assets/fonts/Ubuntu-C-subset.woff';
import UbuntuC2 from '../assets/fonts/Ubuntu-C-subset.woff2';
import NunitoSansEL from '../assets/fonts/NunitoSans-EL-subset.woff';
import NunitoSansEL2 from '../assets/fonts/NunitoSans-EL-subset.woff2';
import NunitoSansELI from '../assets/fonts/NunitoSans-ELI-subset.woff';
import NunitoSansELI2 from '../assets/fonts/NunitoSans-ELI-subset.woff2';
import NunitoSansL from '../assets/fonts/NunitoSans-L-subset.woff';
import NunitoSansL2 from '../assets/fonts/NunitoSans-L-subset.woff2';
import NunitoSansLI from '../assets/fonts/NunitoSans-LI-subset.woff';
import NunitoSansLI2 from '../assets/fonts/NunitoSans-LI-subset.woff2';
import NunitoSansR from '../assets/fonts/NunitoSans-R-subset.woff';
import NunitoSansR2 from '../assets/fonts/NunitoSans-R-subset.woff2';
import NunitoSansRI from '../assets/fonts/NunitoSans-RI-subset.woff';
import NunitoSansRI2 from '../assets/fonts/NunitoSans-RI-subset.woff2';
import NunitoSansSB from '../assets/fonts/NunitoSans-SB-subset.woff';
import NunitoSansSB2 from '../assets/fonts/NunitoSans-SB-subset.woff2';
import NunitoSansSBI from '../assets/fonts/NunitoSans-SBI-subset.woff';
import NunitoSansSBI2 from '../assets/fonts/NunitoSans-SBI-subset.woff2';
import NunitoSansB from '../assets/fonts/NunitoSans-B-subset.woff';
import NunitoSansB2 from '../assets/fonts/NunitoSans-B-subset.woff2';
import NunitoSansBI from '../assets/fonts/NunitoSans-BI-subset.woff';
import NunitoSansBI2 from '../assets/fonts/NunitoSans-BI-subset.woff2';
import NunitoSansEB from '../assets/fonts/NunitoSans-EB-subset.woff';
import NunitoSansEB2 from '../assets/fonts/NunitoSans-EB-subset.woff2';
import NunitoSansEBI from '../assets/fonts/NunitoSans-EBI-subset.woff';
import NunitoSansEBI2 from '../assets/fonts/NunitoSans-EBI-subset.woff2';
import NunitoSansBL from '../assets/fonts/NunitoSans-BL-subset.woff';
import NunitoSansBL2 from '../assets/fonts/NunitoSans-BL-subset.woff2';
import NunitoSansBLI from '../assets/fonts/NunitoSans-BLI-subset.woff';
import NunitoSansBLI2 from '../assets/fonts/NunitoSans-BLI-subset.woff2';

export const fontface = {
  ubuntu: css`
    @font-face {
      font-family: Ubuntu;
      src: url(${UbuntuL2}) format('woff2'), url(${UbuntuL}) format('woff');
      font-display: swap;
      font-weight: 300;
      font-style: normal;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: Ubuntu;
      src: url(${UbuntuLI2}) format('woff2'), url(${UbuntuLI}) format('woff');
      font-display: swap;
      font-weight: 300;
      font-style: italic;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: Ubuntu;
      src: url(${UbuntuR2}) format('woff2'), url(${UbuntuR}) format('woff');
      font-display: swap;
      font-weight: 400;
      font-style: normal;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: Ubuntu;
      src: url(${UbuntuRI2}) format('woff2'), url(${UbuntuRI}) format('woff');
      font-display: swap;
      font-weight: 400;
      font-style: italic;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: Ubuntu;
      src: url(${UbuntuM2}) format('woff2'), url(${UbuntuM}) format('woff');
      font-display: swap;
      font-weight: 500;
      font-style: normal;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: Ubuntu;
      src: url(${UbuntuMI2}) format('woff2'), url(${UbuntuMI}) format('woff');
      font-display: swap;
      font-weight: 500;
      font-style: italic;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: Ubuntu;
      src: url(${UbuntuB2}) format('woff2'), url(${UbuntuB}) format('woff');
      font-display: swap;
      font-weight: 700;
      font-style: normal;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: Ubuntu;
      src: url(${UbuntuBI2}) format('woff2'), url(${UbuntuBI}) format('woff');
      font-display: swap;
      font-weight: 700;
      font-style: italic;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Ubuntu Condensed';
      src: url(${UbuntuC2}) format('woff2'), url(${UbuntuC}) format('woff');
      font-display: swap;
      font-weight: 400;
      font-style: normal;
      unicode-range: U + 20-7e;
    }
  `,
  nunitoSans: css`
    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansEL2}) format('woff2'), url(${NunitoSansEL}) format('woff');
      font-display: swap;
      font-weight: 200;
      font-style: normal;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansELI2}) format('woff2'), url(${NunitoSansELI}) format('woff');
      font-display: swap;
      font-weight: 200;
      font-style: italic;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansL2}) format('woff2'), url(${NunitoSansL}) format('woff');
      font-display: swap;
      font-weight: 300;
      font-style: normal;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansLI2}) format('woff2'), url(${NunitoSansLI}) format('woff');
      font-display: swap;
      font-weight: 300;
      font-style: italic;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansR2}) format('woff2'), url(${NunitoSansR}) format('woff');
      font-display: swap;
      font-weight: 400;
      font-style: normal;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansRI2}) format('woff2'), url(${NunitoSansRI}) format('woff');
      font-display: swap;
      font-weight: 400;
      font-style: italic;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansSB2}) format('woff2'), url(${NunitoSansSB}) format('woff');
      font-display: swap;
      font-weight: 600;
      font-style: normal;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansSBI2}) format('woff2'), url(${NunitoSansSBI}) format('woff');
      font-display: swap;
      font-weight: 600;
      font-style: italic;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansB2}) format('woff2'), url(${NunitoSansB}) format('woff');
      font-display: swap;
      font-weight: 700;
      font-style: normal;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansBI2}) format('woff2'), url(${NunitoSansBI}) format('woff');
      font-display: swap;
      font-weight: 700;
      font-style: italic;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansEB2}) format('woff2'), url(${NunitoSansEB}) format('woff');
      font-display: swap;
      font-weight: 800;
      font-style: normal;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansEBI2}) format('woff2'), url(${NunitoSansEBI}) format('woff');
      font-display: swap;
      font-weight: 800;
      font-style: italic;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansBL2}) format('woff2'), url(${NunitoSansBL}) format('woff');
      font-display: swap;
      font-weight: 900;
      font-style: normal;
      unicode-range: U + 20-7e;
    }

    @font-face {
      font-family: 'Nunito Sans';
      src: url(${NunitoSansBLI2}) format('woff2'), url(${NunitoSansBLI}) format('woff');
      font-display: swap;
      font-weight: 900;
      font-style: italic;
      unicode-range: U + 20-7e;
    }
  `,
};
