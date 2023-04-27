import { useTranslation } from 'next-i18next'
/**
 * MUI
 **/
import { Typography, Stack, Box } from '@mui/material'
/**
 * COMPONENTS
 **/

import HomeIcon from '@components/icons/home'
import PhoneIcon from '@components/icons/phone'
import MailIcon from '@components/icons/mail'

interface Props {
  companyName: string
  address: string
  tel: string
  fax: string
  email: string
  emailIr?: string
  type?: 'HEAD' | 'INVESTOR'
}
export default function CompanyInformation({
  companyName,
  address,
  tel,
  fax,
  email,
  emailIr = '',
  type = 'HEAD'
}: Props) {
  const commonLng = useTranslation('common')
  const information = [
    {
      icon: () => <HomeIcon />,
      text: companyName
    },
    {
      icon: null,
      text: address
    },
    {
      icon: () => <PhoneIcon />,
      text: `${commonLng.t('tel')} :  ${tel}`
    },
    {
      icon: null,
      text: `${commonLng.t('fax')} : ${fax}`
    },
    {
      icon: () => <MailIcon />,
      text: `${commonLng.t('email')} : ${type === 'HEAD' ? email : emailIr}`
    }
  ]

  return (
    <Stack direction="column" rowGap={3}>
      {information.map(({ icon: Icon, text }, idx) => (
        <Stack direction="row" alignItems="center" spacing={3} key={`information-${idx}`}>
          <Box sx={{ minWidth: 15, minHeight: 15 }}>{Icon && <Icon />}</Box>
          <Typography variant="body2" color="body.main" ml={!Icon ? 5 : 0}>
            {text}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}
