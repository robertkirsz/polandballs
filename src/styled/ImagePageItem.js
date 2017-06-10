import styled from 'styled-components'

const ImagePageItem = styled.div`
  margin: 0;
  &:not(:first-of-type) {
    margin-top: 16px;
  }

  figcaption { margin: 16px 0; }

  img {
    display: block;
    width: 100%;
    max-width: 700px;
    &:not(:first-child) { margin-top: 16px; }
  }
`

export default ImagePageItem
