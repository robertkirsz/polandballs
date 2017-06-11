import styled, { css } from 'styled-components'

export default styled.div`
  ${'' /* Display */}
  ${({ flex, block, inline }) => {
    if (inline) {
      if (block) return css`display: inline-block;`
      if (flex) return css`display: inline-flex;`
      return css`display: inline;`
    } else {
      if (flex) return css`display: flex;`
      if (block) return css`display: block;`
    }
  }}

  ${'' /* Flex */}
  ${({
    flex, rowReverse, column, columnReverse, wrap,
    justifyContent, alignItems, alignContent
  }) => {
    if (flex) {
      return css`
        flex-direction: ${() => {
          if (rowReverse) return 'row-reverse'
          if (column) return 'column'
          if (columnReverse) return 'column-reverse'
          return 'row'
        }};
        flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
        justify-content: ${justifyContent || 'flex-start'};
        align-items: ${alignItems || 'stretch'};
        align-content: ${alignContent || 'stretch'};
      `
    }
  }}

  ${'' /* Position */}
  ${({ absolute, relative }) => {
    if (absolute) return css`position: absolute;`
    if (relative) return css`position: relative;`
  }}

  ${'' /* Misc */}
  ${({ spread }) => {
    if (spread) return css`
      justify-content: space-between;
      align-items: center;
    `
  }}
`
