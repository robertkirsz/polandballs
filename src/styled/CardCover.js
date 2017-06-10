import styled from 'styled-components'
import { CardMedia } from 'material-ui/Card'

const CardCover = styled(CardMedia)`
  position: relative;
  max-height: 300px;
  margin: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  overflow: hidden;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
  }
`

export default CardCover
