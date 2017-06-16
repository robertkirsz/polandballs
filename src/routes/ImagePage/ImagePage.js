import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
// Store
import { galleryItemActions } from '../../store'
// Components
import { Link } from 'react-router-dom'
import ImagePageItem from './ImagePageItem'
import { Spinner, Tags, SocialButtons, CommentsList } from '../../components'
// Layout
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import StyledImagePage from '../../styled/ImagePage'
import Div from '../../styled/Div'
import Stats, { StatItem } from '../../styled/Stats'

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
        <Spinner show={loading} />
        {loaded &&
          <Div>
            <Paper className="content">
              <Typography type="headline" gutterBottom>
                {item.title}
              </Typography>
              <Div flex>
                <Typography type="subheading">
                  By{' '}
                  <Link to={`/user/${this.props.galleryItem.item.account_url}`}>
                    {item.account_url}
                  </Link>{' '}
                  created {moment(item.datetime, 'X').fromNow()}
                </Typography>
              </Div>
              <Div flex column alignItems="center" style={{ marginTop: 16 }}>
                {(item.images || [item])
                  .map(image => <ImagePageItem key={image.id} image={image} />)}
              </Div>
              <Div flex wrap spread>
                <Stats>
                  <StatItem>
                    <Icon>remove_red_eye</Icon>{item.views}
                  </StatItem>
                  <StatItem>
                    <Icon>grade</Icon>{item.points}
                  </StatItem>
                </Stats>
                <SocialButtons />
                <Tags tags={item.tags} />
              </Div>
            </Paper>
            <CommentsList id={this.props.match.params.id} />
          </Div>}
      </StyledImagePage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage)
