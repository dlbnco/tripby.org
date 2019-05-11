import styled, { css } from 'styled-components'
import { space, display } from 'styled-system'

const SvgWrapper = styled.svg`
  ${space};
  ${display};
  ${p => css`
    width: ${p.width || p.size}px;
    height: ${p.height || p.size}px;
  `};
`

export default SvgWrapper
