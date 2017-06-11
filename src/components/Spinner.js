import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'

const Spinner = ({ show }) =>
  show
    ? <CircularProgress
      style={{
        alignSelf: 'center',
        width: 60,
        height: 60,
        marginTop: 24
      }} />
    : null

Spinner.propTypes = {
  show: PropTypes.bool.isRequired
}

export default Spinner
