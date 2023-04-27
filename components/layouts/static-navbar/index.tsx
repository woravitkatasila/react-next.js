import type { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
/**
 * MUI
 **/
import { AppBar, Toolbar, Typography, Stack, Box } from '@mui/material'

/**
 * CONSTANTS
 **/
import staticNavbars from '@constants/staticNavbars'

export default function StaticNavbar(): ReactElement {
  const { t } = useTranslation('navbar')
  const router = useRouter()

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Toolbar>
        <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>
          {staticNavbars.map((item, idx) => (
            <Link href={`/${router.query.locale}${item.path}`} key={idx}>
              <a>
                <Typography variant="caption" sx={typographyStyle}>
                  {t(`staticNavbar.${item.key}`)}
                </Typography>
              </a>
            </Link>
          ))}

          <Box>
            <Link href={router.asPath.replace('/en', '/th')} replace>
              <a style={{ marginRight: '5px' }}>
                <Typography
                  variant="caption"
                  sx={[typographyStyle, router.query.locale !== 'th' && typographyInActiveStyle]}
                >
                  TH
                </Typography>
              </a>
            </Link>
            <Typography variant="caption" sx={[typographyStyle, { mr: '5px', mt: '3px' }]}>
              |
            </Typography>
            <Link href={router.asPath.replace('/th', '/en')} replace>
              <a>
                <Typography
                  variant="caption"
                  sx={[typographyStyle, router.query.locale !== 'en' && typographyInActiveStyle]}
                >
                  EN
                </Typography>
              </a>
            </Link>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

const appBarStyle = {
  display: { xs: 'none', md: 'flex' },
  bgcolor: 'secondary.main',
  boxShadow: 'none',
  '& .MuiToolbar-root': {
    minHeight: '45px',
    justifyContent: 'right',
    px: { sm: '60px' }
  }
}

const typographyStyle = {
  color: 'white',
  opacity: 1,
  '&:hover': {
    color: 'body.main'
  }
}
const typographyInActiveStyle = {
  opacity: 0.7
}
