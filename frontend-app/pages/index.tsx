import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Form from '../components/Form'
import Layout from '../components/Layout'

const Home: NextPage = () => (
  <Layout title="Home | GiftGoWhere">
    <div className="w-full p-6 hidden sm:block">
      <h1 className="text-6xl font-bold">
        <a className="text-blue-600" href="https://nextjs.org">
          SpreadJoy
        </a>
      </h1>

      <p className="mt-3 text-2xl">
        Get started by filling the form
        {/* {' '}
        <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
          pages/index.tsx
        </code> */}
      </p>
    </div>
    
    
    <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
      <Form/>
    </div>
  </Layout>
)

export default Home

