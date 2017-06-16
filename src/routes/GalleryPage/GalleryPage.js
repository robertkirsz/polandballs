import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Masonry from 'react-masonry-component'
import _debounce from 'lodash/debounce'
// Store
import { galleryActions } from '../../store'
// Components
import GalleryPageItem from './GalleryPageItem'
import { Spinner, Search, NoResults } from '../../components'
// Layout
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

  body = document.querySelector('body')

  state = {
    visibleItems: null
  }

  debouncedAddMoreItems = _debounce(() => {
    this.detectScrollToBottom()
  }, 100)

  componentWillMount () {
    this.setState({ visibleItems: this.numberOfItems() })

    const { match, galleryActions } = this.props
    // Since we use this component on thee different routes,
    // we need to figure out what data to fetch
    if (match.path === '/user/:id') galleryActions.fetchUserGallery(match.params.id)
    else if (match.path === '/search/:query') galleryActions.searchGallery(match.params.query)
    else galleryActions.fetchGallery('polandball')
  }

  componentDidMount () {
    window.addEventListener('scroll', this.debouncedAddMoreItems)
  }

  componentWillReceiveProps (nextProps) {
    // Fetch data when search params change
    if (this.props.match.params.query !== nextProps.match.params.query) {
      this.props.galleryActions.searchGallery(nextProps.match.params.query)
    }
    // Re-fetch data when returning to the home page from the same component
    if (this.props.match.path !== '/' && nextProps.match.path === '/') {
      this.props.galleryActions.fetchGallery(nextProps.gallery.tag)
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.debouncedAddMoreItems)
  }

  numberOfItems = () =>
    (this.body.getBoundingClientRect().width / 300 + window.outerHeight / 400) * 2

  detectScrollToBottom = () => {
    const windowHeight = window.outerHeight
    const bodyHeight = this.body.getBoundingClientRect().height
    const scrollPosition = window.scrollY

    // When user reaches the bottom of the screen, add more items to the page
    if (!this.props.gallery.appending && scrollPosition + windowHeight > bodyHeight - 100) {
      const visibleItems = this.state.visibleItems + this.numberOfItems()
      this.setState({ visibleItems })

      // If we've shown all the items, fetch some more
      if (visibleItems >= this.props.gallery.items.length) {
        this.props.galleryActions.addMoreItems()
      }
    }
  }

  handleClick = item => {
    this.props.history.push(`/image/${item.id}`)
  }

  render () {
    const { loading, loaded, items } = this.props.gallery
    const isSearchPage = this.props.match.path === '/search/:query'
    const isUserPage = this.props.match.path === '/user/:id'
    const noResults = isSearchPage && loaded && !items.length

    return (
      <StyledGalleryPage>
        {!isUserPage && <Search />}
        <Spinner show={loading} />
        {noResults && <NoResults />}
        {loaded &&
          <Masonry
            options={{ transitionDuration: 0 }}
            updateOnEachImageLoad
            style={{ margin: '8px 0' }}
          >
            {items.slice(0, this.state.visibleItems).map(item =>
              <GalleryPageItem key={item.id} item={item} onClick={this.handleClick} />
            )}
          </Masonry>}
      </StyledGalleryPage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage)
