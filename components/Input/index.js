import styled, { css } from 'styled-components';
import { space, fontSize, width } from 'styled-system';

const Input = styled.input`
  ${space}
  ${fontSize}
  ${width}
  ${({ theme: { borderColor, borderWidth, borderRadius } }) => css`
    border-radius: ${borderRadius};
    border-width: ${borderWidth.regular};
    border-style: solid;
    border-color: ${borderColor};
  `}
  transition: 0.2s;
  &:focus {
    outline: 0;
    ${({ theme: { colors } }) => css`
      box-shadow: 0 0 4px 0 ${colors.screaminGreen};
      border-color: ${colors.heliotrope};
    `};
  }
`;

Input.defaultProps = {
  p: 2,
  variant: 'primary',
};

export default Input;
