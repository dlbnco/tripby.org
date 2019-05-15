import theme from 'styled-theming';
import {
  colors,
  greys,
  breakpoints,
  fontSizes,
  borderWidth,
  borderRadius,
} from './constants';

export const textColor = theme.variants('mode', 'variant', {
  primary: {
    default: greys['800'],
  },
  secondary: {
    default: greys['500'],
  },
});

export const borderColor = theme.variants('mode', 'variant', {
  primary: {
    default: greys['200'],
  },
  secondary: {
    default: greys['100'],
  },
});

export const defaultTheme = {
  mode: 'default',
  variant: 'primary',
  breakpoints: Object.values(breakpoints),
  colors,
  greys,
  fontSizes,
  textColor,
  borderColor,
  borderWidth,
  borderRadius,
};
