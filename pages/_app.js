import 'semantic-ui-css/semantic.min.css'
import '../statics/styles.css'
import React from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = React.useState("")
  const [redirected, setRedir] = React.useState(false)
  const [hash, setHash] = React.useState()
  const router = useRouter()

  React.useEffect(() => {
    if(user === "" && !redirected) {
      router.push('/login')
      setRedir(true)
    }
  },[user])

  if(user === "") return <Component {...pageProps} setUser={setUser} setHash={setHash} />
  return <Component {...pageProps} user={user} hash={hash} />
ß
}
