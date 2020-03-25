import React, { Component } from 'react';
import { Tab, TextArea, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateNote } from './actions'


class NoteTab extends Component {

  state = {note: this.props.note}

  handleChange = e => {
    const { value } = e.target
    this.setState({
      note: {
        ...this.state.note,
        body: value
      }
    })
    this.props.updateNote(this.state.note)
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

export default connect(null, { updateNote })(NoteTab)
