import { Input } from 'baseui/input';
import styled from 'styled-components';
import { space } from 'styled-system';

export default styled(Input)`
  ${space}
  border-color: ${({ theme }) => theme.colors.purpleHeart};
`;
