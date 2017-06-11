import styled from 'styled-components'

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const StatItem = styled.span`
  display: flex;
  align-items: center;
  margin-right: 0.6em;

  .material-icons {
    font-size: inherit;
    margin-right: 0.2em;
  }
`

export default Stats
