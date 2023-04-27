import Document, { Html, Head, Main, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
// import crypto from 'crypto'
// import { v4 } from 'uuid'
// import { Children } from 'react'

// const generateCsp = (): [csp: string, nonce: string] => {
//   // generate random nonce converted to base64. Must be different on every HTTP page load
//   const hash = crypto.createHash('sha256')
//   hash.update(v4())
//   const nonce = hash.digest('base64')

//   let csp = ``
//   csp += `default-src 'self' ;`
//   csp += `base-uri 'self';`
//   csp += `form-action 'self';`
//   csp += `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com data:;` // NextJS requires 'unsafe-inline'
//   csp += `script-src-elem 'nonce-${nonce}' 'self' https://cookiepop.app https://www.googletagmanager.com https://www.google-analytics.com;` // NextJS requires 'self' and 'unsafe-eval' in dev (faster source maps)
//   csp += `script-src 'unsafe-eval';` // require for dev
//   csp += `font-src 'self' https://fonts.gstatic.com data:;`
//   csp += `connect-src 'self' ${process.env.BASE_API} https://www.googletagmanager.com https://www.google-analytics.com https://cookiepop.app;`
//   csp += `img-src 'self' data: blob: ${process.env.BASE_API} https://www.googletagmanager.com https://www.google-analytics.com https://cookiepop.app;`
//   csp += `prefetch-src 'self';`
//   csp += `frame-src *;`
//   csp += `media-src *;`
//   csp += `upgrade-insecure-requests;`

//   return [csp, nonce]
// }

export default function Documents() {
  // const [csp, nonce] = generateCsp()
  return (
    <Html>
      <Head>
        {/* <meta property="csp-nonce" /> */}
        {/* <meta httpEquiv="Content-Security-Policy" /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="/logo.png"></link>
        <script type="text/javascript" src="https://cookiepop.app/dist/ckp.js"></script>
        <script
          id="cookiePop"
          type="text/javascript"
          src="https://cookiepop.app/configs/80e2b35b-7476-4c41-a69a-3a34fa4ac127"
          data-cookiepopid="80e2b35b-7476-4c41-a69a-3a34fa4ac127"
        ></script>
         
      </Head>
      <body>
        <Main />
      </body>
    </Html>
  )
}

Documents.getInitialProps = async (ctx: DocumentContext) => {
  const sheet = new ServerStyleSheet()
  const originalRenderPage = ctx.renderPage

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />)
      })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      )
      //  styles: [...Children.toArray(initialProps.styles), sheet.getStyleElement()]
    }
  } finally {
    sheet.seal()
  }
}
