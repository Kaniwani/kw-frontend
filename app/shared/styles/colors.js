export const whiteLight = '#fafafa';
export const white = '#f0f0f0';
export const whiteDark = '#d9d9d9';
export const greyLight = '#ababab';
export const grey = '#8c8c8c';
export const greyDark = '#616161';
export const blackLight = '#4d4d4d';
export const black = '#3b3b3b';
export const blackDark = '#141414';
export const purpleLight = '#8523e7';
export const purple = '#890ce9';
export const purpleDark = '#6331b9';
export const blueLight = '#30c0f9';
export const blue = '#4c81d6';
export const blueDark = '#2e50dc';
export const green = '#7fd468';
export const teal = '#30b59b';
export const pink = '#ff00c3';
export const red = '#e2325b';
export const orange = '#f66f46';
export const yellowOrange = '#ff9800';
export const yellow = '#f5d800';
export const tan = '#e2b46a';
export const golden = '#f7f7c9';

// safer than transparent keyword since browser implementations are different
export const transparent = 'rgba(0, 0, 0, 0)';

// since we often reference Object.keys(COLORS) or COLORS[color]
// ensure that we can still set currentColor
export const currentColor = 'currentColor';

export const link = blueLight;
export const linkHover = blueDark;

export const SRS_COLORS = {
  APPRENTICE: pink,
  GURU: purpleLight,
  MASTER: blueDark,
  ENLIGHTENED: blueLight,
  BURNED: blackLight,
};
