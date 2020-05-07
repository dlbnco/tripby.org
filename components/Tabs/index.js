import styled from 'styled-components';
import { TabList, Tab } from 'react-tabs';
import { space, fontSize, alignItems, justifyContent } from 'styled-system';

export const StyledTabList = styled(TabList)`
  ${space}
  ${fontSize}
  ${justifyContent}
  ${alignItems}
  display: flex;
  align-items: center;
`;

StyledTabList.defaultProps = {
  variant: 'primary',
};

export const StyledTab = styled(Tab)`
  ${space}
  ${fontSize}
  cursor: pointer;
  transition: 0.2s;
  color: ${({ theme }) => theme.textColor({ theme, variant: 'secondary' })};
  &.react-tabs__tab--selected,
  &:hover {
    color: ${({ theme }) => theme.colors.purpleHeart};
  }
`;
