import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { truncate } from '../../utils'
// Layout
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import AlbumBadge from '../../styled/AlbumBadge'
import CardCover from '../../styled/CardCover'

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
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
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
              See More
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }
}