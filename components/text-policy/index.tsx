import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import TextLink from '@components/text-link'

interface Props {
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify'
}
export default function TextPolicy({ align = 'left' }: Props) {
  const router = useRouter()
  const commonLng = useTranslation('common')

  return (
    <Typography variant="caption" component="div" align={align} color="body.light">
      <Typography component="span" color="error.main">
        *
      </Typography>
      {commonLng.t('privacyPolicyText1')}
      <TextLink link={`/${router.query.locale}/contact-us/privacy-policy`} variant="caption">
        {commonLng.t('privacyPolicyText2')}
      </TextLink>{' '}
      {commonLng.t('privacyPolicyText3')}
    </Typography>
  )
}
