import reshader from 'reshader';

// safer than 'transparent' css value since browser implementations are different
export const transparent = 'rgba(0, 0, 0, 0)';
export const chromeDefaultBg = '#fafafa';

// we sometimes use COLORS[color]
// so ensure that we can still set currentColor easily instead of returning 'undefined'
export const currentColor = 'currentColor';

export const white = reshader('#f0f0f0').palette;
export const grey = reshader('#8c8c8c').palette;
export const black = reshader('#3b3b3b').palette;
export const purple = reshader('#890ce9').palette;
export const blue = reshader('#4c81d6').palette;
export const green = reshader('#7fd468').palette;
export const teal = reshader('#19d6b1').palette;
export const pink = reshader('#ff00c3').palette;
export const red = reshader('#e2325b').palette;
export const orange = reshader('#f66f46').palette;
export const yellow = reshader('#ffd76b').palette;

export const link = blue[5];
export const linkHover = blue[8];

export const SRS_COLORS = {
  UNTRAINED: '#a1a3b6',
  APPRENTICE: '#ff00c3',
  GURU: '#8523e7',
  MASTER: '#2e50dc',
  ENLIGHTENED: '#30c0f9',
  BURNED: '#4d4d4d',
};
