import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
// Store
import { galleryItemActions } from '../../reducers/galleryItemReducer'
// Components
import ImagePageItem from './ImagePageItem'
import Tags from '../../components/Tags'
// Layout
import { CircularProgress } from 'material-ui/Progress'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import StyledImagePage from '../../styled/ImagePage'
import Div from '../../styled/Div'
import Stats from '../../styled/Stats'

const mapStateToProps = ({ galleryItem }) => ({ galleryItem })

const mapDispatchToProps = dispatch => ({
  galleryItemActions: bindActionCreators(galleryItemActions, dispatch)
})

class ImagePage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    galleryItem: PropTypes.object.isRequired,
    galleryItemActions: PropTypes.object.isRequired
  }

  componentWillMount () {
    this.props.galleryItemActions.fetchGalleryItem(this.props.match.params.id)
  }

  render () {
    const { item, loading, loaded } = this.props.galleryItem

    return (
      <StyledImagePage>
        {loading &&
          <CircularProgress
            style={{ alignSelf: 'center', width: 60, height: 60, marginTop: 24 }}
          />}
        {loaded &&
          <Div>
            <Paper style={{ padding: 16 }}>
              <Typography type="headline" gutterBottom>
                {item.title}
              </Typography>
              <Typography type="subheading" gutterBottom>
                {item.account_url} {moment(item.datetime, 'X').fromNow()}
              </Typography>
              <Div flex column alignItems="center">
                {(item.images || [item])
                  .map(image => <ImagePageItem key={image.id} image={image} />)}
              </Div>
              <Div flex wrap justifyContent="space-between" alignItems="center">
                <Stats>
                  <Icon>remove_red_eye</Icon>{item.views}
                  <Icon>grade</Icon>{item.points}
                </Stats>
                <Tags tags={item.tags} />
              </Div>
            </Paper>
          </Div>}
      </StyledImagePage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage)
