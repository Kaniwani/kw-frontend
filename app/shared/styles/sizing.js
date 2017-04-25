export const siteMaxWidth = 1300; // For use with Math operations
export const siteMaxWidthpx = '1300px';

export const mod1 = 1.125; // major second (mobile)
export const mod2 = 1.333; // perfect fourth (desktop)

// Currently the same, but we could change outer to make (wrapper) gutters different to inner (element) gutters
export const padding = {
  mobile: {
    outer: {
      x: (1 * mod1) / 2,
      y: (1 * mod1) / 2,
    },
    inner: {
      x: (0.5 * mod1) / 2,
      y: (0.5 * mod1) / 2,
    },
  },
  desktop: {
    outer: {
      x: (1 * mod2) / 2,
      y: (1 * mod2) / 2,
    },
    inner: {
      x: (0.5 * mod2) / 2,
      y: (0.5 * mod2) / 2,
    },
  },
};

// Borders
export const borderRadius = '.2em';
export const borderRadiusSmall = '3px';
export const borderWidth = '.1em';
