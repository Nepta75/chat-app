interface breakpoints {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
};

export const breakpoints: breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};


export const maxWidth = (breakpoint: keyof breakpoints): string => {
  return `@media screen and (max-width: ${breakpoints[breakpoint]}px)`
}
