import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
// Layout
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import List from '../styled/List'
import Stats from '../styled/Stats'
import StyledComment from '../styled/Comment'

export default class Comment extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render () {
    const { author, datetime, points, comment, children } = this.props.data

    return (
      <StyledComment>
        <Paper className="content">
          <List className="header">
            <Stats>
              <Icon>person</Icon>{author}
              <Icon>access_time</Icon>{moment(datetime, 'X').fromNow()}
              <Icon>grade</Icon>{points}
            </Stats>
          </List>
          <Typography className="message">{comment}</Typography>
        </Paper>
        {(children || []).map(child => <Comment key={child.id} data={child} />)}
      </StyledComment>
    )
  }
}
