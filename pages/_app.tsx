import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@constants/themes/light'
import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'
// import Script from 'next/script'

// type layout
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

// type for props in app
type MyAppProps = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />
        {/* <meta name="author" content={seo.author} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="description" content={seo.description} /> */}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
