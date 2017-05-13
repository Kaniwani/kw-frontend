import React from 'react';
import styled from 'styled-components';

import A from 'base/A';
import H2 from 'base/H2';
import LockButton from 'components/LockButton';
import { elementGutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  display: flex;
  ${({ isActionable }) => !isActionable && 'pointer-events: none;'}
`;

export const LevelLink = styled(({ ...props }) => <A {...props} plainLink />)`
  flex: 999 1 auto;
`;

export const Title = H2;

export const Button = styled(LockButton)`
  ${elementGutter};
  flex: 0 0 auto;
`;
