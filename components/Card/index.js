import styled, { css } from 'styled-components';
import { Box } from 'rebass';

const Card = styled(Box)`
  ${({ shadow }) =>
    shadow &&
    css`
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
    `}
  ${({ theme: { borderWidth, borderColor, borderRadius } }) =>
    css`
      border: ${borderWidth.regular} solid ${borderColor};
      border-radius: ${borderRadius};
    `};
`;

Card.defaultProps = {
  p: 3,
  variant: 'primary',
  shadow: true,
  bg: 'white',
};

export default Card;
