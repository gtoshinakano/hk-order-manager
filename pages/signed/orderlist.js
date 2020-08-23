import React from 'react'
import Layout from '../../components/logged.layout'
import Head from 'next/head'
import {Header, Segment, Table, Label, List} from 'semantic-ui-react'
import firebase from '../../utils/firebase'

const OrderList = (props) => {

  const [loading, setLoading] = React.useState(true)
  const [statuses, setStatuses] = React.useState([])
  const [online, setOnline] = React.useState(false)

  React.useEffect(() => {
    if(props.config)
      firebase.database().ref('delivery_status').on('value', (snap) => {
        setLoading(false)
        console.log(snap.val());
      })
  }, [props.config])

  React.useEffect(() => {
    if(props.config)
    firebase.database().ref(".info/connected").on("value", sn => setOnline(sn.val()));
  })

  console.log(props.config);

  const renderPedidos = (config) => {
    const pedidos = config.pedidos || []
    const estoque = config.estoque || []

    return pedidos.map(p => {
      let prodIndex = 6
      return (<Table.Row key={p[4]+p[5]}>
        <Table.Cell>
          <Label icon="hashtag" ribbon color={periodosColor[p[2]]} content={p[1]}/>
        </Table.Cell>
        <Table.Cell>{p[4]} <Label icon="phone" content={p[5]} size="tiny" /></Table.Cell>
        <Table.Cell>  </Table.Cell>
        <Table.Cell>
          <Label color={periodosColor[p[2]]} content={periodos[p[2]]} size="tiny" icon="clock"/>
          <List bulleted>
          {estoque.map((item,index) => {
            return(
              <List.Item key={item[0]+index}><small>{p[prodIndex+index]>0 ? p[prodIndex+index] : 0} x {item[0]}</small></List.Item>
            )
          })}
          </List>
        </Table.Cell>
        <Table.Cell><b>Total: R$ {p[prodIndex + estoque.length + 2].toFixed(2)}</b></Table.Cell>
        <Table.Cell textAlign="center">
          <Label
            content={p[3]}
          />
        </Table.Cell>
      </Table.Row>)
    })
  }

  if(!props.user) return <p>Redirecionando...</p>
  else{
    const config = props.config || {}
    return (
      <Layout>
        <Head>
          <title>Sistema de Eventos Takeout Hokkaido</title>
        </Head>
        <Header as='h1' className="page-header">Terminal de entrega</Header>
        <Segment className="marged" inverted color="black" disabled={loading} loading={loading}>

        </Segment>
        <Segment className="marged" loading={loading}>
          <Label
            color={online?"green":"red"}
            content={online ? "Você está online" : "Você está offline, tente atualizar a página ou aguarde a reconexão"}
            icon={online?"linkify":"unlink"}
          />
          <Table size="small" stackable>
            <Table.Body>
              {renderPedidos(props.config)}
            </Table.Body>
          </Table>
        </Segment>
      </Layout>
    )
  }

}

const periodosColor = {
  1: "blue",
  2: "purple",
  3: "pink"
}

const periodos = {
  1: "10:30~11:30",
  2: "11:30~12:30",
  3: "12:30~13:30",
}

const statusColors = {
  "Pedido Entregue": "green"
}

export default OrderList
