import Image from '@components/Image'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

/**
 * MUI
 **/
import { Card, Box, CardContent, Typography } from '@mui/material'

import { BASE_URL } from '@constants/config'

interface Props {
  key: string | number
  icon: string | null
  name: string
  readMore?: () => void
}

export default function LoanCard({ icon, name, readMore }: Props) {
  const [isHovering, setIsHovering] = useState(false)
  const commonLng = useTranslation('common')

  const card = {
    height: '100%',
    background: 'url("/images/backgrounds/bg-white.jpg")',
    transition: 'background 1s ease-in-out',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    cursor: 'pointer',
    boxShadow: '-1px 1px 9px rgba(0, 0, 0, 0.05)'
  }

  const cardHover = {
    background: 'url("/images/backgrounds/rectangle-blue.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  }

  return (
    <Card
      sx={[card, isHovering && cardHover]}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={readMore}
    >
      <CardContent sx={{ height: '100%' }}>
        <Box sx={boxBody}>
          <Box sx={boxIcon}>
            {icon && <Image src={`${BASE_URL}${icon}`} alt="loan icon" width={55} height={55} unoptimized />}
          </Box>
          <Typography
            variant="subtitle1"
            component="span"
            align="center"
            fontWeight={{ xs: 400, md: 500 }}
            fontSize={{ xs: 13, sm: 16 }}
          >
            {name}
          </Typography>
          <Box display={{ xs: 'none', md: 'flex' }} alignItems="center">
            <Typography variant="body1" component="span" color="secondary.main" fontSize={16}>
              {commonLng.t('detail')}
            </Typography>
            <Box sx={[boxArrowIcon, isHovering && { ml: 3 }]}>
              <Image src="/images/icons/arrow-right.svg" alt="arrow right icon" width={25} height={15} unoptimized />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

const boxBody = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: { xs: 'center', md: 'flex-start' },
  justifyContent: { xs: 'flex-start', md: 'space-between' },
  rowGap: '20px',
  marginTop: '5px',
  height: '100%'
}

const boxArrowIcon = {
  display: 'flex',
  alignItems: 'flex-end',
  transition: 'margin-left 1s ease-in-out'
}

const boxIcon = {
  display: 'flex',
  alignItems: 'center',
  height: '60px'
}
