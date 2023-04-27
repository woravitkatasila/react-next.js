import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * MUI
 **/
import { Typography, Box, Stack } from '@mui/material'

/**
 * COMPONENTS
 **/
import TextUnderline from '@components/text-underline'

/**
 * TYPE
 **/
import type { Navbars } from '@type/global/navbar'

interface Props {
  title?: string
  navbars?: Navbars
  type: 'navbar' | 'subNavbar'
}

export default function List({ title = '', navbars, type }: Props) {
  const { t } = useTranslation('navbar')
  const router = useRouter()

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <TextUnderline bgColor="error.main" variant="body1" component="div" color="white" text={t(title)} height="3px" />
      <Stack sx={{ mt: 3 }} direction="column" justifyContent="center" alignItems="start" spacing={1}>
        {navbars &&
          navbars.map(({ path, key }) => (
            <Link href={`/${router.query.locale}${path}`} key={key}>
              <a>
                <Typography variant="body2" color="white" component="div" sx={typographyStyle}>
                  {type === 'navbar' ? t(`navbar.${key}`) : t(`subNavbar.${key}`)}
                </Typography>
              </a>
            </Link>
          ))}
      </Stack>
    </Box>
  )
}

const typographyStyle = {
  color: 'white',
  '&:hover': {
    color: 'body.main'
  }
}
