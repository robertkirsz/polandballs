import styled from 'styled-components'
import IconButton from 'material-ui/IconButton'

// !important is needed here due to the way Material UI specificity works

const SocialButton = styled(IconButton)`
  width: 30px !important;
  height: 30px !important;
  margin-bottom: 4px;

  img {
    width: 17px;
    height: 17px;
  }
`

export default SocialButton
