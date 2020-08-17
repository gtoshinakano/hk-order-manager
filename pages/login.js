import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import {Grid, Segment, Header, Form, Button} from 'semantic-ui-react'

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Sistema de Eventos Takeout Hokkaido - Login</title>
      </Head>

      <div>
        <Grid
          centered
          style={{height:'99vh'}}
          verticalAlign="middle"
        >
          <Grid.Column
            tablet="12"
            computer="8"
            mobile="16"
          >
            <Header as='h2' color='teal' textAlign='center'>
              Log-in no Sistema
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Endereço de E-mail' />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Senha'
                  type='password'
                />

                <Button color='teal' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    </Layout>
  )
}
