import React from 'react'
import Head from 'next/head'
import Layout from '../../components/logged.layout'
import {Header, Button, Segment, Form, Radio, Select} from 'semantic-ui-react'
import axios from 'axios'

export default function Main(props) {

  const get_url = process.env.SHEET_GET
  const [form, setForm] = React.useState({
    status: "",
    nome: "",
    celular: "",
    nishin: 0,
    ika: 0,
    pagto: "Pendente",
    valor: 0,
    num: 0,
    periodo: 0,
  })
  const [hasPeriod, setHasPeriod] = React.useState(false)

  const formChange = (e) => setForm({...form, [e.target.name] : e.target.value})
  const periodChange = (e, {value}) => setForm({...form, periodo : value});

  const test = () => {
    axios.get(get_url, {
      params:{
        type:"handshake",
        token: props.hash
      },


    }).then(res => console.log(res))

  }

  console.log(props.config);

  if(!props.user) return <p>Redirecionando...</p>
  else{
    const statusOpt = props.config.status.map(i => {return {key:i[0],text:i[0], value:i[0]}})
    return (
      <Layout>
        <Head>
          <title>Sistema de Eventos Takeout Hokkaido</title>
        </Head>
        <Header as='h1' className="page-header">Adicionar novo pedido</Header>
        <Segment className="marged" inverted color="grey">
          <Form inverted size="big">
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='Nome'
                placeholder='Nome completo'
                name='nome'
                value={form.nome}
                onChange={formChange}
              />
              <Form.Input
                fluid
                label='Contato'
                placeholder='Contato'
                name="celular"
                value={form.celular}
                onChange={formChange}
              />
            </Form.Group>
            <Form.Group grouped>
              <Form.Field
                control={Select}
                label='Status do Pedido'
                options={statusOpt}
                placeholder='Gender'

              />
            </Form.Group>
            <Form.Group grouped>
              <Form.Checkbox
                checked={hasPeriod}
                onChange={() => setHasPeriod(!hasPeriod)}
                label='O contribuinte já informou período de retirada' />
            </Form.Group>
            <Form.Group grouped>
              <label style={{color: "white"}}>Período</label>
              <Form.Field
                control={Radio}
                label='10:30~11:30'
                value='1'
                checked={form.periodo === '1'}
                onChange={periodChange}
                name='periodo'
                disabled={!hasPeriod}
              />
              <Form.Field
                control={Radio}
                label='11:30~12:30'
                value='2'
                checked={form.periodo === '2'}
                onChange={periodChange}
                name='periodo'
                disabled={!hasPeriod}
              />
              <Form.Field
                control={Radio}
                label='12:30~13:30'
                value='3'
                checked={form.periodo === '3'}
                onChange={periodChange}
                name='periodo'
                disabled={!hasPeriod}
              />
            </Form.Group>
            <Button type='submit'>Submit</Button>
          </Form>
        </Segment>
        <Button onClick={test}>handshake</Button>
      </Layout>
    )
  }
}
