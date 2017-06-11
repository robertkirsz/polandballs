import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { truncate } from '../../utils'
// Layout
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Icon from 'material-ui/Icon'
import GridItem from '../../styled/GridItem'
import AlbumBadge from '../../styled/AlbumBadge'
import CardCover from '../../styled/CardCover'
import Stats from '../../styled/Stats'

export default class GalleryPageItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  }

  handleClick = () => {
    this.props.onClick(this.props.item)
  }

  render () {
    const { item } = this.props

    return (
      <GridItem>
        <Card>
          <CardCover onClick={this.handleClick}>
            <img src={item.thumb} alt="" />
            {item.images_count > 1 &&
              <AlbumBadge title="Number of pictures in the album">
                {item.images_count}
              </AlbumBadge>}
          </CardCover>
          <CardContent>
            <Typography type="title" component="h2" gutterBottom>
              {item.title}
            </Typography>
            {item.description &&
              <Typography>
                {truncate(item.description)}
              </Typography>}
          </CardContent>
          <CardActions>
            <Button compact primary style={{ marginLeft: 4 }} onClick={this.handleClick}>
              {item.is_album ? 'See album' : 'See image'}
            </Button>
            <Stats style={{ margin: '0 6px 0 auto' }}>
              <Icon>remove_red_eye</Icon>{item.views}
              <Icon>grade</Icon>{item.points}
            </Stats>
          </CardActions>
        </Card>
      </GridItem>
    )
  }
}
