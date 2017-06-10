import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// Store
import { galleryActions } from '../../reducers/galleryReducer'
// Components
import GalleryPageItem from './GalleryPageItem'
import StyledGalleryPage from '../../styled/GalleryPage'
// Layout
import { CircularProgress } from 'material-ui/Progress'
import Grid from 'material-ui/Grid'

const mapStateToProps = ({ gallery }) => ({ gallery })

const mapDispatchToProps = dispatch => ({
  galleryActions: bindActionCreators(galleryActions, dispatch)
})

class GalleryPage extends Component {
  static propTypes = {
    gallery: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    galleryActions: PropTypes.object.isRequired
  }

  componentWillMount () {
    if (!this.props.gallery.loaded) {
      this.props.galleryActions.fetchGallery()
    }
  }

  handleClick = item => {
    this.props.history.push(`/${item.id}`)
  }

  render () {
    const { loading, loaded, items } = this.props.gallery

    return (
      <StyledGalleryPage>
        {loading &&
          <CircularProgress
            style={{ alignSelf: 'center', width: 60, height: 60, marginTop: 24 }}
          />}
        {loaded &&
          <Grid container justify="center" gutter={16}>
            {items.map(item =>
              <GalleryPageItem key={item.id} item={item} onClick={this.handleClick} />
            )}
          </Grid>}
      </StyledGalleryPage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage)
