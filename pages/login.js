import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import {Grid, Segment, Header, Form, Button, Message} from 'semantic-ui-react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Login(props) {

  const [form, setForm] = React.useState({email: process.env.USEREMAIL, senha: process.env.PASSWORD})
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState({type: "", msg: ""})
  const router = useRouter()

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
      if(res.data.success) {
        setMessage({type:"success", msg: "Login efetuado com sucesso! Aguarde enquanto preparamos o sistema.."})
        axios.get(get_url, {
          params:{
            type:"handshake",
            token: res.data.token
          },
        }).then(hs => {
          setLoading(false)
          props.setUser(res.data.success[0])
          props.setHash(res.data.token)
          props.setHandshake(hs.data)
          router.push('/signed/orderlist') //TODO HANDLE ERROR
        })

      }else{
        setMessage({type:"error", msg:"ERRO: Usuário e/ou senha incorretos"})
        setLoading(false)
      }
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
            <Form size='large' onSubmit={doLogin} success={message.type === "success"}
            error={message.type === "error"}>
              <Segment stacked loading={loading}>
                <Message
                  header={message.msg}
                  success={message.type === "success"}
                  error={message.type === "error"}
                  hidden={message.type === ""}
                  visible={message.type !== ""}
                />
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
