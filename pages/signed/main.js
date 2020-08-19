import React from 'react'
import Head from 'next/head'
import Layout from '../../components/logged.layout'
import {Header, Button, Segment, Form, Radio, Select, Item, Input, Label} from 'semantic-ui-react'
import axios from 'axios'

export default function Main(props) {

  const get_url = process.env.SHEET_GET
  const [form, setForm] = React.useState({
    status: "Contato Inicial",
    nome: "",
    celular: "",
    pagto: "Pendente",
    valor: 0,
  })
  const [hasPeriod, setHasPeriod] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const formChange = (e,{name, value}) => setForm({...form, [name] : value})
  const periodChange = (e, {value}) => setForm({...form, periodo : value});

  const submit = () => {
    setLoading(true)
    axios.get(get_url, {
      params:{
        type:"add-new-order",
        token: props.hash,
        dados: form
      },
    }).then(res => {
      console.log(res);
      setLoading(false)
      setForm({
        status: "Contato Inicial",
        nome: "",
        celular: "",
        pagto: "Pendente",
        valor: 0,
      })
      // TODO handle more stuffs here
    })
  }

  const addToCart = (key, price) => {
    const qtd = form[key] || 0
    setForm({
      ...form,
      [key]: qtd + 1,
      valor: form.valor + price
    })
  }

  const removeFromCart = (key, price) => {
    setForm({
      ...form,
      [key]: form[key] -1,
      valor: form.valor - price
    })
  }

  const renderProducts = (products) => {
    return (
      <Item.Group relaxed divided>
        {products.map(product => {
          return(
            <Item key={product.key}>
              <Item.Image size='mini' src={product.image} />

              <Item.Content verticalAlign='middle'>
                <Item.Header>{product.name} - R$ {product.price.toFixed(2)}</Item.Header>
                <Item.Description>
                  <Button
                    floated="right"
                    label={{basic:true, content:"R$", color:"green"}}
                    labelPosition="left"
                    content={(product.price * (form[product.key] || 0)).toFixed(2)}
                    color="green"
                    type="button"

                  />
                  <Button.Group floated="right" size='medium'>
                    <Button
                      color="blue"
                      icon="minus"
                      disabled={!form[product.key] || form[product.key] === 0}
                      onClick={() => removeFromCart(product.key, product.price)}
                      type="button"
                    />
                    <Button.Or text={form[product.key] || 0} />
                    <Button
                      color="blue"
                      icon="plus"
                      onClick={() => addToCart(product.key, product.price)}
                      type="button"
                    />
                  </Button.Group>
                </Item.Description>
              </Item.Content>
            </Item>
          )}
        )}
        <Item>
          <Item.Content>
            <Item.Header><h2>Total R$ {form.valor.toFixed(2)}</h2></Item.Header>
          </Item.Content>
        </Item>
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
    const pagOpts = [{key:"pendente", value:"Pendente", text  :"Pendente"},{key:"confirmado", value:"Confirmado", text  :"Confirmado"},{key:"dinheiro", value:"Dinheiro no Dia", text :"Dinheiro no Dia"}]
    return (
      <Layout>
        <Head>
          <title>Sistema de Eventos Takeout Hokkaido</title>
        </Head>
        <Header as='h1' className="page-header">Adicionar novo pedido</Header>
        <Segment className="marged" inverted color="black" disabled={loading} loading={loading}>
          <Form inverted size="big" onSubmit={submit}>
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
            <Segment>
              <Header icon="cart" content="Itens do pedido"/>
              {renderProducts(products)}
              </Segment>
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
            <Form.Group grouped>
              <Form.Field
                control={Select}
                label='Status do Pagamento'
                options={pagOpts}
                placeholder='Pagamento'
                onChange={formChange}
                value={form.pagto}
                name="pagto"
              />
              <Form.Field
                label="Comprovante"
                control={Form.Input}
                disabled={form.pagto !== "Confirmado"}
                name="comprovante"
                value={form.comprovante}
              />
            </Form.Group>
            <Form.Field
              fluid
              control={Button}
              type='submit'
              size="big"
              color="blue"
              disabled={form.nome === "" || form.celular=== "" || form.valor === 0 || loading}
            >
              Submit
            </Form.Field>
          </Form>
        </Segment>
      </Layout>
    )
  }
}
