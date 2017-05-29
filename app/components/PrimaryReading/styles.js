import styled from 'styled-components';

import { godzilla, beta } from 'shared/styles/typography';
import { gutter } from 'shared/styles/layout';
import { resetList } from 'shared/styles/utils';

export const Wrapper = styled.div`
  /* eschew vertical padding since ja has huge line-height */
  ${gutter({ type: 'outer', position: 'horizontal' })};
`;

export const Character = styled.div.attrs({
  lang: 'JA',
})`
  ${gutter({ type: 'inner' })};
  ${godzilla}
`;

export const Kanas = styled.ul.attrs({
  lang: 'JA',
})`
  ${beta}
  ${resetList}
  display: flex;
  flex-flow: row wrap;
`;

export const Kana = styled.li`
  ${gutter({ type: 'inner' })};
`;
