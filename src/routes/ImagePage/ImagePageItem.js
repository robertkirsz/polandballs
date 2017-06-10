import React from 'react'
import PropTypes from 'prop-types'
import StyledImagePageItem from '../../styled/ImagePageItem'

const ImagePageItem = ({ image }) =>
  <StyledImagePageItem>
    <img src={image.link} alt="" />
    <figcaption>{image.description}</figcaption>
  </StyledImagePageItem>

ImagePageItem.propTypes = {
  image: PropTypes.object.isRequired
}

export default ImagePageItem
