import { Heading as CoreHeading } from 'rebass';
import styled from 'styled-components';

const Heading = styled(CoreHeading)`
  color: ${({ color, theme }) => color || theme.colors.purpleHeart};
`;

Heading.defaultProps = {
  as: 'h1',
  variant: 'primary',
};

export default Heading;
