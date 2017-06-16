import styled, { css } from 'styled-components'

const margin = '8px'

const List = styled.div`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
  justify-content: ${props => props.right ? 'flex-end' : 'flex-start'};
  ${({ wrap }) => wrap && css`flex-wrap: wrap;`}
  ${props => {
    if (props.vertical) return css`> *:not(:first-child) { margin-top: ${props.margin || margin}; }`
    if (props.right) return css`> *:not(:first-child) { margin-left: ${props.margin || margin}; }`
    else return css`> *:not(:first-child) { margin-left: ${props.margin || margin}; }`
  }}
`

export default List
