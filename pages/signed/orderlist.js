import React from 'react'
import Layout from '../../components/logged.layout'
import Head from 'next/head'
import {Header, Segment, Table, Label, List, Confirm, Button, Message, Modal} from 'semantic-ui-react'
import moment from "moment"
import firebase from '../../utils/firebase'
import axios from 'axios'
import SearchOrder from '../../components/search.order'

const OrderList = (props) => {

  const [loading, setLoading] = React.useState(true)
  const [statuses, setStatuses] = React.useState([])
  const [online, setOnline] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState()
  const [alert, setAlert] = React.useState("")

  React.useEffect(() => {
    if(props.config)
      firebase.database().ref('delivery_status').on('value', (snap) => {
        setLoading(false)
        if(snap.val()) {
          setStatuses(snap.val());
        }
      })
  }, [])

  React.useEffect(() => {
    if(props.config)
      firebase.database().ref(".info/connected").on("value", sn => setOnline(sn.val()));
  },[])

  const openConfirm = (selected) => {
    if(online){
      setAlert("")
      setSelected(selected)
      setOpen(true)
    }
  }
  const closeConfirm = () => setOpen(false)
  const get_url = process.env.SHEET_GET
  const deliverOrder = () => {
    setLoading(true)
    const time = moment().format("YYYY/MM/DD HH:mm:ss")
    axios.get(get_url, {
      params:{
        type:"deliver-order",
        token: props.hash,
        pedido: selected[1],
        time: time,
        terminal: props.user
      },
    }).then(res => {
      firebase.database().ref('delivery_status/'+selected[1])
      .set({
        svtime: firebase.database.ServerValue.TIMESTAMP,
        user: props.user,
        time: time
      })
      .then(() => {
        setAlert(res.data.msg)
        setLoading(false)
        setOpen(false)
      })
    })
  }

  const renderModal = () => {
    if(selected) return(
      <Segment basic loading={loading}>
        <Label color="green" content={"No. " + selected[1]} size="big" style={styles.labelSpacer} />
        <Label icon="user" color="teal" content={selected[4]} size="big" style={styles.labelSpacer}/>
        <br />
        {props.config.estoque.map((item,index) => {
          return(
            <div key={item[0]+index+selected[4]}>
              <Label size="big" style={styles.labelSpacer}>
                {selected[6+index]>0 ? selected[6+index] : 0} x {item[0]}
              </Label>
              <br />
            </div>
          )
        })}
        <Label
          content={"Total R$ " + selected[10].toFixed(2)}
          size="big"
          style={styles.labelSpacer}
          color="grey"
        /><br />
        <Label
          icon="clock"
          color={periodosColor[selected[2]]}
          content={"Período " + selected[2] + " - " + periodos[selected[2]]}
          size="medium"
          style={styles.labelSpacer}
        /><br />
        <Label
          icon="phone"
          style={styles.labelSpacer}
          content={"Contato: " + selected[5]}
          color={periodosColor[selected[2]]}
        />
      </Segment>
    )
    else return null
  }

  const renderPedidos = (config) => {
    const pedidos = config.pedidos || []
    const estoque = config.estoque || []
    const statusKeys = Object.keys(statuses)

    return pedidos.map(p => {
      let prodIndex = 6
      const delivered = p[3] === "Pedido Entregue" || statusKeys.includes(p[1].toString())
      return (
        <Table.Row
          key={p[4]+p[5]}
          onClick={() => !delivered && openConfirm(p)}
          negative={delivered}
        >
          <Table.Cell>
            <Label icon="hashtag" ribbon color={periodosColor[p[2]]} content={p[1]}/>
          </Table.Cell>
          <Table.Cell><b>{p[4]}</b> <Label icon="phone" content={p[5]} size="tiny" /></Table.Cell>
          <Table.Cell>
          </Table.Cell>
          <Table.Cell>
            <Label
              color={periodosColor[p[2]]}
              content={periodos[p[2]]}
              size="tiny"
              icon="clock"
            />
            {delivered && <Label content={statuses[p[1].toString()] && "Entregue às " + statuses[p[1].toString()].time} size="tiny" basic/>}
            <List bulleted size="large">
            {estoque.map((item,index) => {
              return(
                <List.Item key={item[0]+index}>{p[prodIndex+index]>0 ? p[prodIndex+index] : 0} x {item[0]}</List.Item>
              )
            })}
            </List>
          </Table.Cell>
          <Table.Cell><b>Total: R$ {p[prodIndex + estoque.length + 2].toFixed(2)}</b></Table.Cell>
          <Table.Cell textAlign="center">
            <Label
              content={statuses[p[1].toString()] ? "Pedido entregue por " + statuses[p[1].toString()].user : delivered ? "Pedido Entregue" : p[3]}
              size="large"
              basic={delivered}
              icon={delivered ? "calendar check outline" : "hourglass half"}
              color={delivered ? "green" : 'teal'}
            />
          </Table.Cell>
        </Table.Row>
      )
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
          <SearchOrder
            list={props.config.pedidos}
            delivered={Object.keys(statuses)}
            onSelect={openConfirm}
          />
        </Segment>
        <Segment className="marged" loading={loading} disabled={!online} inverted>
          <Label
            color={online?"green":"red"}
            content={online ? "Você está online" : "Você está offline, tente atualizar a página ou aguarde a reconexão"}
            icon={online?"linkify":"unlink"}
          />
          <Message hidden={alert === ""} header={alert} success />
          <Modal
            open={alert !== ""}
            header='Mensagem do servidor'
            content={alert}
            onClose={() => setAlert("")}
          />
          <Table size="small" stackable selectable>
            <Table.Body>
              {renderPedidos(props.config)}
            </Table.Body>
          </Table>
        </Segment>
        <Confirm
          open={open}
          header='Confira os dados antes de entregar o pedido ao cliente'
          confirmButton={() => <Button
            color="green"
            content="Entregar Pedido"
            disabled={loading}
            onClick={deliverOrder}
          />}
          cancelButton={() => <Button
            content="Cancelar"
            disabled={loading}
            onClick={closeConfirm}
          />}
          content={renderModal}
        />
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

const styles = {
  labelSpacer:{
    margin:3
  }
}

export default OrderList
