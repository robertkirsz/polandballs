import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// Store
import { galleryActions } from '../../reducers/galleryReducer'
// Components
import GalleryPageItem from './GalleryPageItem'
import Spinner from '../../components/Spinner'
import Search from '../../components/Search'
import NoResults from '../../components/NoResults'
// Layout
import Button from 'material-ui/Button'
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
    if (match.path === '/') galleryActions.fetchGallery('polandball')
    if (match.path === '/user/:id') galleryActions.fetchUserGallery(match.params.id)
    if (match.path === '/search/:query') {
      galleryActions.searchGallery(match.params.query)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.query !== nextProps.match.params.query) {
      this.props.galleryActions.searchGallery(nextProps.match.params.query)
    }
  }

  handleClick = item => {
    this.props.history.push(`/image/${item.id}`)
  }

  addMoreItems = () => {
    this.props.galleryActions.addMoreItems()
  }

  render () {
    const { loading, loaded, appending, items } = this.props.gallery
    const isMainPage = this.props.match.path === '/'
    const isSearchPage = this.props.match.path === '/search/:query'
    const isUserPage = this.props.match.path === '/user/:id'
    const noResults = isSearchPage && loaded && !items.length

    return (
      <StyledGalleryPage>
        {!isUserPage && <Search />}
        <Spinner show={loading} />
        {noResults && <NoResults />}
        {loaded &&
          <Grid container gutter={16} style={{ margin: '8px -8px' }}>
            {items.map(item =>
              <GalleryPageItem key={item.id} item={item} onClick={this.handleClick} />
            )}
          </Grid>}
        <Spinner show={appending} />
        {isMainPage && loaded &&
          <Button onClick={this.addMoreItems} style={{ alignSelf: 'center' }}>Show more</Button>}
      </StyledGalleryPage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage)
