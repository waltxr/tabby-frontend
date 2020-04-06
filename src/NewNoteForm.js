import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'
import { addNote } from './actions'
import { connect } from 'react-redux'

const initialState = {title: '', body: 'new note'}

class NewNoteForm extends Component {
  state = initialState

  handleAddNote = () => {
    const { addNote, token, notes } = this.props
    const note = {title: this.state.title, body: this.state.body}
    if (note.title.length === 0) {
      note.title=`Note ${notes.length}`
    }
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
    token: state.auth.token,
    notes: state.notes.list
  }
}

export default connect(mapStateToProps, { addNote })(NewNoteForm)
