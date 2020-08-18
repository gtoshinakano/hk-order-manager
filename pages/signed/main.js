import Head from 'next/head'
import Layout from '../../components/logged.layout'

export default function Main() {
  return (
    <Layout>
      <Head>
          <title>Sistema de Eventos Takeout Hokkaido</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>Main</p>
    </Layout>
  )
}
