import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
//Layout
import Icon from 'material-ui/Icon'
import SearchForm from '../styled/SearchForm'

class Search extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  textInput = null

  state = {
    query: ''
  }

  componentWillMount () {
    this.setState({ query: this.props.match.params.query || '' })
  }

  handleChange = e => {
    this.setState({ query: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.history.push(`/search/${this.state.query}`)
  }

  focus = () => {
    this.textInput.focus()
  }

  render = () =>
    <SearchForm onClick={this.focus}>
      <form onSubmit={this.handleSubmit}>
        <Icon>search</Icon>
        <input
          value={this.state.query}
          onChange={this.handleChange}
          ref={input => {
            this.textInput = input
          }}
        />
      </form>
    </SearchForm>
}

export default withRouter(Search)
