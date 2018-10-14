// safer than 'transparent' css value since some browser implementations use transparent 'white'
export const transparent = 'rgba(0, 0, 0, 0)';

// we sometimes use COLORS[color]
// so ensure that we can still set currentColor easily instead of returning 'undefined'
export const currentColor = 'currentColor';

// NOTE: previously used reshader package, however it lacks polyfills for older browsers

// reshader('#f0f0f0').palette;
export const white = [
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#F0F0F0',
  '#D8D8D8',
  '#C2C2C2',
  '#AFAFAF',
  '#9E9E9E',
  '#8E8E8E',
];

// reshader('#8c8c8c').palette;
export const grey = [
  '#E2E2E2',
  '#CDCDCD',
  '#BABABA',
  '#A9A9A9',
  '#9A9A9A',
  '#8C8C8C',
  '#7E7E7E',
  '#717171',
  '#666666',
  '#5C5C5C',
  '#535353',
];

// reshader('#3b3b3b').palette;
export const black = [
  '#606060',
  '#575757',
  '#4F4F4F',
  '#484848',
  '#414141',
  '#3B3B3B',
  '#353535',
  '#303030',
  '#2B2B2B',
  '#272727',
  '#232323',
];

// reshader('#8523e7').palette;
export const purple = [
  '#D6B5F7',
  '#C392F3',
  '#B172F0',
  '#A155ED',
  '#923BEA',
  '#8523E7',
  '#7818D8',
  '#6C16C2',
  '#6114AF',
  '#57129E',
  '#4E108E',
];

// reshader('#4c81d6').palette;
export const blue = [
  '#DCE6F7',
  '#B9CEEF',
  '#9AB8E8',
  '#7EA4E1',
  '#6492DB',
  '#4C81D6',
  '#3470D1',
  '#2B64C0',
  '#275AAD',
  '#23519C',
  '#20498C',
];

// reshader('#7fd468').palette;
export const green = [
  '#FFFFFE',
  '#E0F4DB',
  '#C4EBBA',
  '#ABE39C',
  '#94DB81',
  '#7FD468',
  '#6ACD4F',
  '#57C739',
  '#4EB433',
  '#46A22E',
  '#3F9229',
];

// reshader('#82e8d4').palette;
export const cyan = [
  '#FFFFFF',
  '#FFFFFF',
  '#E8FBF7',
  '#C3F4EB',
  '#A1EEDF',
  '#82E8D4',
  '#63E2C9',
  '#48DDC0',
  '#2FD8B7',
  '#25C7A8',
  '#21B397',
];

// reshader('#ff00c3').palette;
export const pink = [
  '#FF9CE8',
  '#FF77DF',
  '#FF55D7',
  '#FF36D0',
  '#FF1AC9',
  '#FF00C3',
  '#E600AF',
  '#CF009E',
  '#BA008E',
  '#A70080',
  '#960073',
];

// reshader('#e2325b').palette;
export const red = [
  '#F7C4D0',
  '#F2A1B4',
  '#ED819A',
  '#E96483',
  '#E54A6E',
  '#E2325B',
  '#DA1F4A',
  '#C41C43',
  '#B0193C',
  '#9E1736',
  '#8E1531',
];

// reshader('#f66f46').palette;
export const orange = [
  '#FFFEFD',
  '#FDDBD1',
  '#FBBCA9',
  '#F9A085',
  '#F78664',
  '#F66F46',
  '#F55828',
  '#F4430D',
  '#DD3B0A',
  '#C73509',
  '#B33008',
];

// reshader('#ffd76b').palette;
export const yellow = [
  '#FFFFFF',
  '#FFFFFF',
  '#FFF8E3',
  '#FFECB7',
  '#FFE18F',
  '#FFD76B',
  '#FFCD47',
  '#FFC426',
  '#FFBC09',
  '#EEAD00',
  '#D69C00',
];

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
