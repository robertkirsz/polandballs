import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'
import _debounce from 'lodash/debounce'
// Store
import { galleryActions } from '../../reducers/galleryReducer'
// Components
import GalleryPageItem from './GalleryPageItem'
import Spinner from '../../components/Spinner'
import Search from '../../components/Search'
import NoResults from '../../components/NoResults'
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

  isPhone = window.matchMedia('(max-width: 767px)').matches
  isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches
  isDesktop = window.matchMedia('(min-width: 1024px)').matches

  state = {
    visibleItems: null
  }

  debouncedAddMoreItems = _debounce(state => {
    this.detectScrollToBottom()
  }, 100)

  componentWillMount () {
    if (this.isPhone) this.setState({ visibleItems: 5 })
    if (this.isTablet) this.setState({ visibleItems: 8 })

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

  componentDidUpdate (prevProps, prevState) {
    // Update layout when new elements appear
    if (
      (!prevProps.gallery.loaded && this.props.gallery.loaded) ||
      (!prevProps.gallery.appended && this.props.gallery.appended) ||
      this.state.visibleItems !== prevState.visibleItems
    ) {
      this.initializeMasonry()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.debouncedAddMoreItems)
  }

  detectScrollToBottom = () => {
    const windowHeight = window.outerHeight
    const bodyHeight = document.querySelector('body').getBoundingClientRect().height
    const scrollPosition = window.scrollY

    // When user reaches the bottom of the screen, add more items to the page
    if (!this.props.gallery.appending && scrollPosition + windowHeight > bodyHeight - 200) {
      let visibleItems = this.state.visibleItems
      if (this.isMobile) visibleItems += 5
      if (this.isTablet) visibleItems += 8

      // If we've shown all the items, fetch some more
      if (this.isDesktop || visibleItems >= this.props.gallery.items.length) {
        this.props.galleryActions.addMoreItems()
      }

      if (!this.isDesktop) this.setState({ visibleItems })
    }
  }

  initializeMasonry = () => {
    const elem = document.querySelector('.grid')

    const msnry = new Masonry(elem, {
      columnWidth: '.grid-sizer',
      itemSelector: '.grid-item',
      percentPosition: true,
      transitionDuration: 0
    })

    const imgLoad = imagesLoaded(elem)

    imgLoad.on('progress', () => msnry.layout())
  }

  handleClick = item => {
    this.props.history.push(`/image/${item.id}`)
  }

  render () {
    const { loading, loaded, appending, items } = this.props.gallery
    const isSearchPage = this.props.match.path === '/search/:query'
    const isUserPage = this.props.match.path === '/user/:id'
    const noResults = isSearchPage && loaded && !items.length

    const _items = this.isDesktop ? items : items.slice(0, this.state.visibleItems)

    return (
      <StyledGalleryPage>
        {!isUserPage && <Search />}
        <Spinner show={loading} />
        {noResults && <NoResults />}
        {loaded &&
          <div className="grid">
            <div className="grid-sizer" />
            {_items.map(item =>
              <GalleryPageItem key={item.id} item={item} onClick={this.handleClick} />
            )}
          </div>}
        <Spinner show={appending} />
      </StyledGalleryPage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage)
