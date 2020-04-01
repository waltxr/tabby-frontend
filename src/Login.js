import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Dimmer, Loader, Message } from 'semantic-ui-react'
import './Login.css'
import { authenticate } from './actions'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';


class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { authenticate } = this.props
    authenticate(this.state)
    this.setState({
      email: ''
    })
  }

  render() {

    if (this.props.auth.authenticated) {
      return <Redirect to='/notes' />
    }

    return (
      <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          { this.props.auth.authenticating ?
            <Dimmer active>
               <Loader size='massive'>Logging in...</Loader>
            </Dimmer>
            :
            <div>
              <Header as='h2' textAlign='center' className='login-header'>
                Log in to Tabby
              </Header>
              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment style={{ backgroundColor: '#131356' }}>
                  {
                    this.props.auth.authenticationError ?
                      <Message color='red' size='mini'>
                        Nah we can't find an account that matches those credentials D;
                      </Message> :
                      null
                  }
                  <Form.Input
                    className='login-form-input'
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    name='email'
                  />
                  <Form.Input
                    className='login-form-input'
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.state.pasword}
                    onChange={this.handleChange}
                    name='password'
                  />

                  <Button type='submit' className='login-button' fluid size='large'>
                    Log in
                  </Button>
                </Segment>
              </Form>
              <Link id='signup-button' to='signup'>Sign Up</Link>
            </div>
          }
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { authenticate })(Login)
