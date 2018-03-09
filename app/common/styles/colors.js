import reshader from 'reshader';

// safer than 'transparent' css value since browser implementations are different
export const transparent = 'rgba(0, 0, 0, 0)';

// we sometimes use COLORS[color]
// so ensure that we can still set currentColor easily instead of returning 'undefined'
export const currentColor = 'currentColor';

export const white = reshader('#f0f0f0').palette;
export const grey = reshader('#8c8c8c').palette;
export const black = reshader('#3b3b3b').palette;
export const purple = reshader('#8523e7').palette;
export const blue = reshader('#4c81d6').palette;
export const green = reshader('#7fd468').palette;
export const cyan = reshader('#82e8d4').palette;
export const pink = reshader('#ff00c3').palette;
export const red = reshader('#e2325b').palette;
export const orange = reshader('#f66f46').palette;
export const yellow = reshader('#ffd76b').palette;

export const link = blue[5];
export const linkHover = blue[8];

export const SRS_COLORS = {
  UNTRAINED: '#a2bfff',
  APPRENTICE: '#ff6edc',
  GURU: '#8523e7',
  MASTER: '#2a50dc',
  ENLIGHTENED: '#62cffa',
  BURNED: '#4d4d4d',
};
