import type { NextPage } from 'next'

import { useEffect } from 'react'
import { useRouter } from 'next/router'



const Home: NextPage = () => {
  const router = useRouter()
  const user = localStorage.getItem('user');


  useEffect(() => {
    if (user !== null) {
      router.push('/authentication/Login')
    }
  }, [])

  return (
    <>
     
    </>
  )
}

export default Home
