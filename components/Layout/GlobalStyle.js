import { createGlobalStyle } from 'styled-components';
import { textColor } from '../../lib/theme';

const GlobalStyle = createGlobalStyle`
  * {font-family: 'Barlow', sans-serif !important; color: ${({ theme }) =>
    textColor({ theme, variant: 'primary' })};}
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
