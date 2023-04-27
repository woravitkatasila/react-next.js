/**
 * MUI
 **/
import { Card, Stack, Typography } from '@mui/material'

/**
 * COMPONENTS
 **/
import ChainIcon from '@components/icons/chain'
import PaperDownloadIcon from '@components/icons/paperDownload'

/**
 * TYPE
 **/
import { IconProps } from '@type/global/icon'

interface Props {
  title: string
  txtDownload?: string
  icon?: (props: IconProps) => JSX.Element
}

export default function DownloadDocCard({ title, txtDownload = 'ดาวน์โหลดเอกสาร', icon: Icon }: Props) {
  return (
    <Card sx={boxCard}>
      <Stack direction="row" spacing={3}>
        {Icon ? <Icon /> : <ChainIcon />}
        <Typography color="secondary.main" component="div" variant="body2">
          {title}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <PaperDownloadIcon width="18" height="18" />
        <Typography color="primary.main" component="div" variant="body2" align="center" sx={txtLoadStyle}>
          {txtDownload}
        </Typography>
      </Stack>
    </Card>
  )
}

const boxCard = {
  backgroundColor: 'white',
  boxShadow: '-1px 1px 9px rgba(0, 0, 0, 0.05);',
  borderRadius: '5px',
  py: 3,
  px: { xs: 2, sm: 6 },
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const txtLoadStyle = {
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline'
  },
  display: { xs: 'none', sm: 'flex' }
}
