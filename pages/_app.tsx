import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Header from '@/components/header'
import Footer from '@/components/footer'
import Head from 'next/head'
import PageLayout from '@/layout/pageLayout'
import { useEffect } from 'react'


export default function App({ Component, pageProps }: AppProps) {
  
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  

  return <>
    <Head>
      <title>로아계산기</title>
      <meta name="description" content="로스트아크 생활, 제작, 경매 계산기" />
      <meta name="keywords" content="로스트아크 생활 계산기, 로스트아크 제작 계산기, 로스트아크, 로스트아크 경매 계산기" />
      <meta name="og:site_name" content="로아 계산기" />
      <meta name="og:title" content="로아 계산기" />
      <meta name="og:description"
  content="로스트아크 생활, 제작, 경매 계산기"/>
  <meta name="og:type" content="website" />
  <meta name="og:url" content="https://cal.arkinfo.kr" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>
    <Header></Header>
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
    <Footer></Footer>
  </>
}
