import { Text as CoreText } from 'rebass';
import styled from 'styled-components';

const Wrapper = styled(CoreText)`
  color: ${({ color, theme }) => color || theme.textColor};
`;

Wrapper.defaultProps = {
  variant: 'primary',
};

export default Text;
