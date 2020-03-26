import React, { Component } from 'react';
import { Tab, TextArea, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateNote, updateUpdatedNotes } from './actions'


class NoteTab extends Component {

  state = {note: this.props.note}

  handleChange = e => {
    const { value } = e.target

    const newState = {note: {
      ...this.state.note,
      body: value
    }}

    this.setState(newState)
    this.props.updateNote(newState.note)

    if (!this.props.updatedNotes.includes(newState.note.id)) {
      this.props.updateUpdatedNotes(newState.note.id)
    }

  }

  static getDerivedStateFromProps(props, state) {
    if (props.note.id !== state.note.id) {
      return props
    }
    return null
  }

  render() {
    return(
      <Tab.Pane>
        <Form>
          <TextArea
            rows={25}
            value={this.state.note.body}
            onChange={this.handleChange}
          />
        </Form>
      </Tab.Pane>
    )
  }

}

const mapStateToProps = state => {
  return {
    updatedNotes: state.notes.updatedNotes
  }
}

export default connect(mapStateToProps, { updateNote, updateUpdatedNotes })(NoteTab)
