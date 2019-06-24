import styled from 'styled-components';
import { Button as CoreButton } from 'rebass';

const Button = styled(CoreButton)`
  background-color: ${({ theme }) => theme.colors.purpleHeart};
  transition: 0.1s ease-out;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.heliotrope};
  }
`;

export default Button;
