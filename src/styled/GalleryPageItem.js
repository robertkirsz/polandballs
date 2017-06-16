import styled from 'styled-components'

const GalleryPageItem = styled.div`
  padding: 8px;
  width: 100%;
  @media (min-width: 600px) { width: 50%; }
  @media (min-width: 960px) { width: 33.333%; }
  @media (min-width: 1280px) { width: 25%; }
  @media (min-width: 1920px) { width: 20%; }
`

export default GalleryPageItem
