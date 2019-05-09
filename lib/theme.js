import theme from 'styled-theming';
import { colors, greys, breakpoints, fontSizes } from './constants';

export const defaultTheme = {
  primary: colors.dodgerBlue,
  mode: 'default',
  variant: 'primary',
  breakpoints: Object.values(breakpoints),
  fontSizes,
};

export const textColor = theme.variants('mode', 'variant', {
  primary: {
    default: greys['900'],
  },
  secondary: {
    default: greys['500'],
  },
});

export const borderColor = theme.variants('mode', 'variant', {
  primary: {
    default: colors.royalBlue,
  },
  secondary: {
    default: greys['100'],
  },
});
