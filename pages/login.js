import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import {Grid, Segment, Header, Form, Button} from 'semantic-ui-react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Login(props) {

  const [form, setForm] = React.useState({email: process.env.USEREMAIL, senha: process.env.PASSWORD})
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const router = useRouter()

  console.log(props);

  const get_url = process.env.SHEET_GET

  const formChange = (e, {value, name}) => {
    setForm({...form, [name]: value})
  }

  const doLogin = (e) => {
    setLoading(true)
    axios.get(get_url, {
      params: {
        type:'login',
        ...form
      }
    })
    .then(res => {
      console.log(res);
      setLoading(false)
      if(res.data.success) {
        props.setUser(res.data.success[0])
        router.push('/')
      }else setError(res.data.error)
    })
  }

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
            <Form size='large' onSubmit={doLogin}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Endereço de E-mail'
                  value={form.email}
                  onChange={formChange}
                  name="email"
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Senha'
                  type='password'
                  value={form.senha}
                  name="senha"
                  onChange={formChange}
                />

                <Button
                  color='teal'
                  fluid size='large'
                  disabled={form.email === "" || form.senha === "" || loading}
                  loading={loading}
                >
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
