import Image from '@components/Image'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

/**
 * MUI
 **/
import { Typography, Box, Button } from '@mui/material'

/**
 * COMPONENTS
 **/
import PhoneCircleIcon from '@components/icons/phoneCircle'
import FacebookLogoIcon from '@components/icons/facebookLogo'
import GmailLogoIcon from '@components/icons/gmailLogo'
import LineLogoIcon from '@components/icons/lineLogo'
import TextUnderline from '@components/text-underline'
import LineLink from '@components/line-link'

/**
 * CONSTANTS
 **/
import { BASE_URL } from '@constants/config'

interface Props {
  phone: string
  facebook: string
  email: string
  lineId: string
  lineQrcode: string
}

export default function Information({ phone, facebook, email, lineId, lineQrcode }: Props) {
  const commonLng = useTranslation('common')

  return (
    <Box sx={[boxRow, { columnGap: '1rem' }]}>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <PhoneCircleIcon color="white" />
      </Box>
      <Box sx={[boxColumn, { rowGap: '2rem' }]}>
        <Box sx={boxColumn}>
          <Typography variant="body2" color="white" component="span">
            Contact Center
          </Typography>
          <TextUnderline bgColor="error.main" variant="body2" component="div" color="white" text={phone} height="3px" />
        </Box>
        <Box sx={[boxColumn, boxBorderRed]}>
          <Typography variant="body2" color="white" component="span">
            Follow us
          </Typography>
          <Box sx={[boxRow, { columnGap: '0.4rem' }]}>
            <Link href={`mailto:${email}`}>
              <a style={{ display: 'inline-flex', alignItems: 'center' }}>
                <GmailLogoIcon color="" />
              </a>
            </Link>
            <Link href={`http://www.facebook.com/${facebook}`}>
              <a style={{ display: 'inline-flex', alignItems: 'center' }} target="_blank">
                <FacebookLogoIcon color="#0B5D99" />
              </a>
            </Link>
          </Box>
        </Box>
        <Box sx={[boxRow, { alignItems: 'center', columnGap: '0.5rem' }]}>
          <Image src={`${BASE_URL}${lineQrcode}`} alt="qr code" width={48} height={46} unoptimized={true} />
          <LineLink lineId={lineId}>
            <Button variant="contained" sx={lineButoon}>
              <LineLogoIcon />
              <Typography variant="caption" component="div" fontSize={12}>
                {commonLng.t('addFriend')}
              </Typography>
            </Button>
          </LineLink>
        </Box>
      </Box>
    </Box>
  )
}

const boxRow = {
  display: 'flex'
}

const boxColumn = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start'
}

const boxBorderRed = {
  borderBottom: '3px solid',
  borderColor: 'error.main',
  rowGap: '1rem',
  pb: '20px'
}

const lineButoon = {
  backgroundColor: '#4ECB71',
  color: 'white',
  columnGap: '5px',
  p: 1,
  height: '30px',
  minWidth: '87px',
  whiteSpace: 'pre'
}
