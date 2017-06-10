import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// Store
import { galleryActions } from '../../reducers/galleryReducer'
// Components
import StyledGalleryPage from '../../styled/GalleryPage'
// Layout
import { CircularProgress } from 'material-ui/Progress'

const mapStateToProps = ({ gallery }) => ({ gallery })

const mapDispatchToProps = dispatch => ({
  galleryActions: bindActionCreators(galleryActions, dispatch)
})

class GalleryPage extends Component {
  static propTypes = {
    gallery: PropTypes.object.isRequired,
    galleryActions: PropTypes.object.isRequired
  }

  componentWillMount () {
    if (!this.props.gallery.loaded) {
      this.props.galleryActions.fetchGallery()
    }
  }

  render () {
    const { loading } = this.props.gallery

    return (
      <StyledGalleryPage>
        {loading &&
          <CircularProgress
            style={{ alignSelf: 'center', width: 60, height: 60, marginTop: 24 }}
          />}
      </StyledGalleryPage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage)
