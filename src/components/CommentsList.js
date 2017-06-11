import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// Store
import { galleryItemActions } from '../reducers/galleryItemReducer'
// Components
import Comment from './Comment'
import Spinner from './Spinner'
// Layout
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Div from '../styled/Div'

const mapStateToProps = ({ galleryItem }) => ({ galleryItem })

const mapDispatchToProps = dispatch => ({
  galleryItemActions: bindActionCreators(galleryItemActions, dispatch)
})

class CommentsList extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    galleryItem: PropTypes.object.isRequired,
    galleryItemActions: PropTypes.object.isRequired
  }

  state = {
    expandAll: false
  }

  componentWillMount () {
    this.props.galleryItemActions.fetchComments(this.props.id)
  }

  toggleExpandAll = () => {
    this.setState({ expandAll: !this.state.expandAll })
  }

  getNumberOfComments = comments => {
    let counter = 0

    const count = array => {
      array.forEach(item => {
        counter += 1
        count(item.children)
      })
    }

    count(comments)

    if (counter === 0) return 'No comments'

    return `${counter} ${counter > 1 ? 'comments' : 'comment'}`
  }

  render () {
    const { commentsLoading, commentsLoaded, comments } = this.props.galleryItem
    const { expandAll } = this.state
    const hasCommentReplies = !!comments.find(comment => comment.children.length > 0)

    return (
      <Div flex column>
        <Spinner show={commentsLoading} />
        {commentsLoaded &&
          <Div flex column>
            <Div flex spread style={{ marginTop: 16 }}>
              <Typography type="title">
                {this.getNumberOfComments(comments)}
              </Typography>
              {hasCommentReplies &&
                <Button onClick={this.toggleExpandAll}>
                  {expandAll ? 'Collapse all' : 'Expand all'}
                </Button>}
            </Div>
            {comments.map(comment =>
              <Comment key={comment.id} data={comment} expandAll={expandAll} />
            )}
          </Div>}
      </Div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)
