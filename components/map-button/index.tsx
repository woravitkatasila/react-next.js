import { useTranslation } from 'next-i18next'
import Link from 'next/link'

/**
 * MUI
 **/
import { Typography, Button } from '@mui/material'
import PinIcon from '@components/icons/pin'

interface Props {
  link: string
}

export default function MapButton({ link }: Props) {
  const commonLng = useTranslation('common')

  return (
    <Link href={link} passHref>
      <a target="_blank" rel="noopener">
        <Button variant="contained" sx={ButtonCustom}>
          <PinIcon color="white" width="20" height="20" />
          <Typography variant="body2" component="div" fontWeight={400}>
            {commonLng.t('getDirections')}
          </Typography>
        </Button>
      </a>
    </Link>
  )
}

const ButtonCustom = {
  backgroundColor: 'primary.main',
  color: 'white',
  columnGap: '5px',
  p: 2.5,
  height: '30px'
}
