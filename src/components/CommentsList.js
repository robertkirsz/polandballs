import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// Store
import { galleryItemActions } from '../reducers/galleryItemReducer'
// Components
import Comment from './Comment'
// Layout
import { CircularProgress } from 'material-ui/Progress'
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

  componentWillMount () {
    this.props.galleryItemActions.fetchComments(this.props.id)
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

    return (
      <Div flex column>
        {commentsLoading &&
          <CircularProgress
            style={{ alignSelf: 'center', width: 40, height: 40, marginTop: 24 }}
          />}
        {commentsLoaded &&
          <Div flex column>
            <h3>{this.getNumberOfComments(this.props.galleryItem.comments)}</h3>
            {comments.map(comment => <Comment key={comment.id} data={comment} />)}
          </Div>}
      </Div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)
