import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { Redemption } from '../../interfaces'
import Layout from '../../components/Layout'
import RedemptionNodeList from '../../components/RedemptionNodeList'

type Props = {
  items: Redemption[]
}

function Redemptions() {
  const [redemptionData, setRedemptionData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRedemptions() {
      const urlData = 'https://useczavsf8.execute-api.ap-southeast-1.amazonaws.com/default/gift-redemption?method=all'
      setLoading(true)
      try {
        const res = await fetch(urlData)
        if (!res.ok) {
          const message: string = `An error has occurred: ${res.status}`
          throw new Error(message)
        }
        const data = await res.json();
        setRedemptionData(data)
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message)
        }
        console.log(String(err))
      } finally {
        setLoading(false)
      }
    }
    fetchRedemptions()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!redemptionData) return <p>No redemption data</p>
  
  return (
    LayoutPage(redemptionData)
  )
}

export default Redemptions

const LayoutPage = ({ items }: Props ) => (
  <Layout title="Redemptions List">
    <div className="flex flex-col">
      <h1>Redemptions List</h1>
      <p>
        Company W redemption records
      </p>
      <p>You are currently on: /redemptions</p>
    </div>
    <div className="flex w-full max-w-4xl">
      <RedemptionNodeList items={items} />
    </div>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)