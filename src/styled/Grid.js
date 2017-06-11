import styled from 'styled-components'

const Grid = styled.div`
  margin-top: 16px;
  column-gap: 1.5em;
  @media (min-width: 600px) { column-count: 2; }
  @media (min-width: 960px) { column-count: 3; }
  @media (min-width: 1280px) { column-count: 4; }
  @media (min-width: 1920px) { column-count: 5; }
`

export default Grid
