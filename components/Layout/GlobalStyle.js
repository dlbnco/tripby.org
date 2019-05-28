import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {font-family: 'Barlow', sans-serif !important;}
  a {
    color: inherit;
    text-decoration: none;
    position: relative;
  }

a::before {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${({ theme: { colors } }) => colors.heliotrope};
  transform-origin: bottom right;
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

a:hover::before {
  transform-origin: bottom left;
  transform: scaleX(1);
}
`;

export default GlobalStyle;
