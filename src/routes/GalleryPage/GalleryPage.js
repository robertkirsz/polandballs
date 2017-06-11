import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// Store
import { galleryActions } from '../../reducers/galleryReducer'
// Components
import GalleryPageItem from './GalleryPageItem'
import Spinner from '../../components/Spinner'
// Layout
import Grid from 'material-ui/Grid'
import StyledGalleryPage from '../../styled/GalleryPage'

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
    const { match, galleryActions } = this.props
    if (match.path === '/') galleryActions.fetchGallery()
    if (match.path === '/user/:id') galleryActions.fetchUserGallery(match.params.id)
  }

  handleClick = item => {
    this.props.history.push(`/image/${item.id}`)
  }

  render () {
    const { loading, loaded, items } = this.props.gallery

    return (
      <StyledGalleryPage>
        <Spinner show={loading} />
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
