import React from 'react'
import Head from 'next/head'
import Layout from '../../components/logged.layout'
import {Header, Button, Segment, Form, Radio, Select, Item, Input} from 'semantic-ui-react'
import axios from 'axios'

export default function Main(props) {

  const get_url = process.env.SHEET_GET
  const [form, setForm] = React.useState({
    status: "Contato Inicial",
    nome: "",
    celular: "",
    pagto: "Pendente",
    valor: 0,
    num: 0,
    periodo: 0,
  })
  const [hasPeriod, setHasPeriod] = React.useState(false)

  const formChange = (e,{name, value}) => setForm({...form, [name] : value})
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

  const renderProducts = (products) => {
    return (
      <Item.Group relaxed>
        {products.map(product => {
          return(
            <Item key={product.key}>
              <Item.Image size='small' src={product.image} />

              <Item.Content verticalAlign='middle'>
                <Item.Header>{product.name} - R$ {product.price.toFixed(2)}</Item.Header>
                <Item.Meta>
                  Alterar valor para esta venda{" "}
                  <Input
                    value={product.price}
                    label={{ basic: true, content: 'R$' }}
                    type="number"
                    step="0.1"
                  />
                </Item.Meta>
                <Item.Extra>
                  <Button.Group size='medium'>
                    <Button color="blue" icon="minus"/>
                    <Button.Or text="0" />
                    <Button color="blue" icon="plus"/>
                  </Button.Group>
                </Item.Extra>
              </Item.Content>
            </Item>
          )}
        )}
      </Item.Group>
    )
  }

  if(!props.user) return <p>Redirecionando...</p>
  else{
    const statusOpt = props.config.status.map(i => {return {key:i[0],text:i[0], value:i[0]}})
    const products = props.config.estoque.map(i => {return {
      key: i[0].toLowerCase(),
      name: i[0],
      price: i[4],
      inStock: i[2],
      image: i[7]
    }})
    return (
      <Layout>
        <Head>
          <title>Sistema de Eventos Takeout Hokkaido</title>
        </Head>
        <Header as='h1' className="page-header">Adicionar novo pedido</Header>
        <Segment className="marged" inverted color="black">
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
            <Segment>{renderProducts(products)}</Segment>
            <Form.Group grouped>
              <Form.Field
                control={Select}
                label='Status do Pedido'
                options={statusOpt}
                placeholder='Status'
                onChange={formChange}
                value={form.status}
                name="status"
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
