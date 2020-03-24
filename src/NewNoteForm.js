import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'
import { addNote } from './actions'
import { connect } from 'react-redux'


class NewNoteForm extends Component {
  state = {
    title: '',
    body: 'new note'
  }

  handleAddNote = () => {
    const { addNote, token } = this.props
    const note = this.state
    addNote(note, token)
    this.setState({
      title: ''
    })
  }

  handleChange = e => {
    const { value } = e.target
    this.setState({
      title: value
    })
  }

  render() {
    return(
      <Input
        action={{
          icon: 'plus',
          onClick: () => this.handleAddNote()
        }}
        placeholder='Add new note...'
        onChange={this.handleChange}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

export default connect(mapStateToProps, { addNote })(NewNoteForm)
