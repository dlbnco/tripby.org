import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Box } from 'rebass';
import { breakpoints } from '../../lib/constants';

const Container = styled(Box)`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  ${({ fluid }) =>
    !fluid &&
    css`
      @media (min-width: ${breakpoints.sm}) {
        max-width: 540px;
      }
      @media (min-width: ${breakpoints.md}) {
        max-width: 720px;
      }
      @media (min-width: ${breakpoints.lg}) {
        max-width: 960px;
      }
      @media (min-width: ${breakpoints.xl}) {
        max-width: 1140px;
      }
      @media (min-width: ${breakpoints.xxl}) {
        max-width: 1280px;
      }
    `};
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth}px !important;
    `}
`;

Container.propTypes = {
  fluid: PropTypes.bool,
  maxWidth: PropTypes.number,
};

Container.defaultProps = {
  fluid: false,
  px: [2, 3, 4],
  maxWidth: undefined,
};

export default Container;
