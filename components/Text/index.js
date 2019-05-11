import { Text as CoreText } from 'rebass';
import styled from 'styled-components';

const Text = styled(CoreText)`
  color: ${({ color, theme }) => color || theme.textColor};
`;

Text.defaultProps = {
  variant: 'primary',
};

export default Text;
