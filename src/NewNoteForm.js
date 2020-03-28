import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'
import { addNote } from './actions'
import { connect } from 'react-redux'

const initialState = {title: '', body: 'new note'}

class NewNoteForm extends Component {
  state = initialState

  handleAddNote = () => {
    const { addNote, token } = this.props
    const note = this.state
    addNote(note, token)
    this.setState({
      title: initialState.title,
      body: initialState.body
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
        placeholder='Make a new note...'
        onChange={this.handleChange}
        value={this.state.title}
        className='new-note-form'
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
