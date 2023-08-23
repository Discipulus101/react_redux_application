export const breakpoints = {
  mobile: 375,
  tablet: 768,
  laptop: 1024,
  desctop: 1440,
};

export const media = {
  mobile: `@media (min-width: ${breakpoints.mobile}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px)`,
  laptop: `@media (min-width: ${breakpoints.laptop}px)`,
  desctop: `@media (min-width: ${breakpoints.desctop}px)`,
};
