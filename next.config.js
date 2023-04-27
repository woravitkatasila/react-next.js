/** @type {import('next').NextConfig} */
//const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom'
  },
  trailingSlash: true,
  // i18n
  env: {
    BASE_API: process.env.BASE_API
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // {
          //   key: 'Content-Security-Policy',
          //   value: `frame-ancestors 'self'`
          //   // value: `upgrade-insecure-requests;default-src 'self' ; style-src https://fonts.googleapis.com https://cookiepop.app 'self'  ;font-src https://fonts.gstatic.com 'self' data:; img-src * 'self' data:;script-src 'self' https://cookiepop.app;`
          //   // value: `default-src 'self' https://fonts.googleapis.com https://cookiepop.app https://fonts.gstatic.com ; upgrade-insecure-requests`
          // },

          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
          // {
          //   key: 'Permissions-Policy',
          //   value: "camera=(); battery=(self); geolocation=(); microphone=('https://somewhere.com')"
          // }
        ]
      }
    ]
  }
}

module.exports = nextConfig
