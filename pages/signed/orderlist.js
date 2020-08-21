import React from 'react'
import Layout from '../../components/logged.layout'
import Head from 'next/head'
import {Header, Segment} from 'semantic-ui-react'
import firebase from '../../utils/firebase'


const OrderList = (props) => {

  const [loading, setLoading] = React.useState(false)

  if(!props.user) return <p>Redirecionando...</p>
  else{

    return (
      <Layout>
        <Head>
          <title>Sistema de Eventos Takeout Hokkaido</title>
        </Head>
        <Header as='h1' className="page-header">Terminal de entrega</Header>
        <Segment className="marged" inverted color="black" disabled={loading} loading={loading}>


        </Segment>

      </Layout>
    )
  }

}

export default OrderList
