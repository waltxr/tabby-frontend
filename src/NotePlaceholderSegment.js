import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

const segmentStyle = {
  textAlign: 'center',
  backgroundColor: '#020221',
  height: '100vh',
  paddingTop: '300px',
  marginTop: '40px'
}

const headerStyle = {
  color: 'white',
  fontFamily: 'Electrolize'
}

const NotePlaceholderSegment = () => (
  <Segment style={segmentStyle}>
    <Header as='h3' style={headerStyle}>
      No notes open!
    </Header>
  </Segment>
)

export default NotePlaceholderSegment
