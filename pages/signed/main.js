import Head from 'next/head'
import Layout from '../../components/logged.layout'
import {Header} from 'semantic-ui-react'

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>Sistema de Eventos Takeout Hokkaido</title>
      </Head>
      <Header as='h1' className="page-header">First Header</Header>
    </Layout>
  )
}
