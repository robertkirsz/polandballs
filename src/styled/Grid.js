import styled from 'styled-components'

const Grid = styled.div`
  column-gap: 1.5em;
  @media (min-width: 768px) { column-count: 2; }
  @media (min-width: 1024px) { column-count: 3; }
  @media (min-width: 1440px) { column-count: 4; }
`

export default Grid
