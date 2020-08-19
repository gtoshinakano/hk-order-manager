import Head from 'next/head'
import Layout from '../../components/logged.layout'
import {Header, Button} from 'semantic-ui-react'
import axios from 'axios'

export default function Main(props) {
  console.log(props);

  const get_url = process.env.SHEET_GET

  const test = () => {
    axios.get(get_url, {
      params:{
        dados:
          {
            status: "Contato Inicial",
            nome: "Fulano de Tal",
            celular: "95454-5455",
            nishin: 2,
            ika: 3,
            pagto: "Pendente",
            valor: 100,
          },
        type:"add-new-order",
        token:1163195000
      },


    }).then(res => console.log(res))

  }
  if(!props.user) return <p>Redirecionando...</p>
  else
  return (
    <Layout>
      <Head>
        <title>Sistema de Eventos Takeout Hokkaido</title>
      </Head>
      <Header as='h1' className="page-header">Adicionar novo pedido</Header>
      <Button onClick={test}>click me</Button>
    </Layout>
  )

}
