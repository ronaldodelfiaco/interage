import type { NextPage } from 'next'

import cookie from 'js-cookie';
import { useEffect } from 'react'
import { useRouter } from 'next/router'



const Home: NextPage = () => {
  const router = useRouter()
  const user = cookie.get('user');


  useEffect(() => {
    if (user !== null) {
      router.push('/pessoas')
    }
  }, [])

  return (
    <>

    </>
  )
}

export default Home
