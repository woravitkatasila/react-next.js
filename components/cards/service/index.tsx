import Image from '@components/Image'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

/**
 * MUI
 **/
import { Card, CardMedia, CardContent, CardActions, Typography, Box, Stack } from '@mui/material'

interface Props {
  title: string
  img: string
  handleClick: () => void
}

export default function ServiceCard({ title, img, handleClick }: Props) {
  const [isHovering, setIsHovering] = useState(false)
  const commonLng = useTranslation('common')
  const navbarLng = useTranslation('navbar')

  return (
    <Card
      sx={cardStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ height: '100%' }}>
        <Box sx={boxMedia}>
          <Stack sx={[boxRibbon, isHovering && boxRibbonHover]}>
            <Image src="/images/ribbon-red.png" alt="ribbon-red icon" width={180} height={150} />
          </Stack>
          <CardMedia
            component="img"
            height="300"
            image={img}
            alt="service"
            sx={[cardMedia, isHovering && cardMediaHover]}
          />
        </Box>
        <CardContent sx={{ p: '20px' }}>
          <Typography
            variant="subtitle1"
            component="span"
            fontWeight={{ xs: 400, md: 500 }}
            sx={[isHovering && { color: 'primary.main' }]}
          >
            {navbarLng.t(title)}
          </Typography>
        </CardContent>
        <CardActions sx={cardAction}>
          <Typography variant="body1" component="span" color="secondary.main" fontSize={16}>
            {commonLng.t('detail')}
          </Typography>
          <Box sx={[boxArrowIcon, isHovering && { ml: 3 }]}>
            <Image src="/images/icons/arrow-right.svg" alt="arrow right icon" width={25} height={15} unoptimized />
          </Box>
        </CardActions>
      </Box>
    </Card>
  )
}

const cardStyle = {
  height: '100%',
  cursor: 'pointer',
  borderRadius: 2
}

const boxMedia = {
  height: { xs: '200px', sm: '300px' },
  overflow: 'hidden',
  position: 'relative'
}

const boxRibbon = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  zIndex: 99,
  opacity: 0,
  transition: 'opacity 1s ease-in-out'
}

const boxRibbonHover = {
  opacity: 1
}

const cardMedia = {
  tranformOrigin: 'center center',
  transition: 'transform 1s ease-in-out'
}

const cardMediaHover = {
  transform: 'scale(1.3)'
}

const cardAction = {
  p: '20px 20px',
  display: { xs: 'none', md: 'flex' }
}

const boxArrowIcon = {
  display: 'flex',
  alignItems: 'center',
  transition: 'margin-left 1s ease-in-out'
}
