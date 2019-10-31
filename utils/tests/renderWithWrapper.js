import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../lib/theme';
import IntlProvider from '../../components/IntlProvider';

/**
 * All the providers or mock providers needed for testing without errors
 */
const AppProviders = ({ children }) => (
  <IntlProvider>
    <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
  </IntlProvider>
);

/**
 * @function renderWithWrapper
 * @description wraps a component with app providers and renders it for testing
 * @param {ReactElement} component - component to be wrapped
 * @param {Object} options - additional render options
 */
const renderWithWrapper = (component, options) =>
  render(component, {
    wrapper: AppProviders,
    ...options,
  });

export default renderWithWrapper;
