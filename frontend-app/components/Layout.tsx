import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

type Props = {
  children?: ReactNode
  title?: string
}

const sheetUrl = 'https://docs.google.com/spreadsheets/d/1H3abnLcu_Uv0qTikaGQFTATGxwr47Ba3oAr3Mj0qVUk/edit?usp=sharing'

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <Head>
      <title>SpreadJoy App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header>
      <nav className="p-4">
        <span className="hidden sm:inline">
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
        </span>
        <span className="text-xl text-blue-600  inline sm:hidden">
          <Link href="/">
            <a className="font-bold">SpreadJoy</a>
          </Link>{' '}
        </span>
        {/* |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '} */}
        |{' '}
        <Link href="/redemptions">
          <a>Redemptions</a>
        </Link>
        {/* |{' '} */}
        {/* | <a href="/api/redemptions">Redemptions API</a> */}
      </nav>
    </header>
    <main className="flex w-full max-w-max flex-1 flex-col items-center justify-center text-center">
      {children}
    </main>
    <footer className="flex h-24 px-4 w-full items-center justify-center border-t flex-col text-blue-600 ">
      <div className="mb-5">
        <span className="text-sm">Data accessible via <a href={sheetUrl}>Google Spreadsheet</a></span>
      </div>
      <div
        className="flex items-center justify-center gap-2"
      >
        <span className="text-gray-400 font-bold">Product of Company W</span>
        {' '}
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img src="/adamctj_icon.svg" alt="Company W Logo" className="w-10 h-10"/>
      </div>
      
    </footer>
  </div>
)

export default Layout
