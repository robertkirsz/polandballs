import React from 'react'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'
import List from '../styled/List'

const Tags = ({ tags }) =>
  <List right>
    {tags.map(tag => <Chip key={tag.name} label={tag.display_name} />)}
  </List>

Tags.propTypes = {
  tags: PropTypes.array
}

Tags.defaultProps = {
  tags: []
}

export default Tags
