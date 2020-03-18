import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'


class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.authenticate()
  }

  authenticate = () => {
    
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
          Log in to Tabby
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment style={{ backgroundColor: 'black' }}>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                value={this.state.email}
                onChange={this.handleChange}
                name='email'
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={this.state.pasword}
                onChange={this.handleChange}
                name='password'
              />

              <Button type='submit' color='teal' fluid size='large' style={{color: 'black'}}>
                Log in
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login
