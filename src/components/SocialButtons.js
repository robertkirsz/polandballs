import React from 'react'
// Layout
import List from '../styled/List'
import SocialButton from '../styled/SocialButton'
// Icons
import FacebookIcon from '../assets/facebook.svg'
import TwitterIcon from '../assets/twitter.svg'

const shareToFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?url=${window.location.href}`, '_blank')
}

const shareToTwitter = () => {
  window.open(`https://twitter.com/intent/tweet/?url=${window.location.href}`, '_blank')
}

const SocialButtons = () =>
  <List>
    <SocialButton style={{ backgroundColor: '#3b5999' }} onClick={shareToFacebook}>
      <img src={FacebookIcon} alt="Share to Facebook" />
    </SocialButton>
    <SocialButton style={{ backgroundColor: '#55acee' }} onClick={shareToTwitter}>
      <img src={TwitterIcon} alt="Share to Twitter" />
    </SocialButton>
  </List>

export default SocialButtons
