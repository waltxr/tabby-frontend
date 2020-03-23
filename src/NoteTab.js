import React, { Component } from 'react';
import { Tab, TextArea, Form } from 'semantic-ui-react'

class NoteTab extends Component {

  state = {
    body: this.props.body
  }

  handleChange = e => {
    const { value } = e.target
    this.setState({
      body: value
    })
  }

  render() {
    return(
      <Form>
        <Tab.Pane><TextArea rows={25} value={this.state.body} onChange={this.handleChange} /></Tab.Pane>
      </Form>
    )
  }

}

export default NoteTab
