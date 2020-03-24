import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'
import { addNote } from './actions'
import { connect } from 'react-redux'



class NewNoteForm extends Component {
  state = {
    title: ''
  }

  handleAddNote = () => {
    const { addNote } = this.props
    const { title } = this.state
    addNote(title)
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

export default connect(null, { addNote })(NewNoteForm)
