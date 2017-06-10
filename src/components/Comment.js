import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
// Layout
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import List from '../styled/List'
import Stats from '../styled/Stats'
import StyledComment from '../styled/Comment'

export default class Comment extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    expandAll: PropTypes.bool.isRequired
  }

  state = {
    showChildComments: false
  }

  componentWillMount () {
    this.setState({ showChildComments: this.props.expandAll })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.expandAll && !this.props.expandAll) {
      this.setState({ showChildComments: true })
    }

    if (!nextProps.expandAll && this.props.expandAll) {
      this.setState({ showChildComments: false })
    }
  }

  toggleChildComments = () => {
    this.setState({ showChildComments: !this.state.showChildComments })
  }

  render () {
    const { author, datetime, points, comment, children } = this.props.data
    const { showChildComments } = this.state

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
          {children.length > 0 &&
            <IconButton
              onClick={this.toggleChildComments}
              style={{ position: 'absolute', top: 0, right: 0 }}
            >
              <Icon>{showChildComments ? 'expand_less' : 'expand_more'}</Icon>
            </IconButton>}
          <Typography className="message">{comment}</Typography>
        </Paper>
        {showChildComments &&
          children.map(child =>
            <Comment key={child.id} data={child} expandAll={this.props.expandAll} />
          )}
      </StyledComment>
    )
  }
}
