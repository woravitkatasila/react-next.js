import { useState } from 'react'
import { useTranslation } from 'next-i18next'

/**
 * MUI
 **/
import { Card, Box, CardContent, Typography, Button } from '@mui/material'

interface Props {
  title: string
  subTitle: string
  txtButton: string
  img: string
  imgBlur: string
  handleClick: () => void
}

export default function CalculateCard({ title, subTitle, txtButton, img, imgBlur, handleClick }: Props) {
  const [isHovering, setIsHovering] = useState(false)
  const commonLng = useTranslation('common')
  const navbarLng = useTranslation('navbar')

  const card = {
    height: '200px',
    background: `url(${img})`,
    transition: 'background 0.8s ease-in-out',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    borderRadius: 2
  }

  const cardHover = {
    background: `url(${imgBlur})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  }

  return (
    <Card
      sx={[card, isHovering && cardHover]}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <CardContent sx={cardContent}>
        <Box sx={boxBody}>
          <Box>
            <Typography variant="h5" component="div" fontWeight={500} color="white" fontSize={{ xs: 16, md: '1.7rem' }}>
              {navbarLng.t(title)}
            </Typography>
            <Typography variant="caption" component="div" color="white">
              {commonLng.t(subTitle)}
            </Typography>
          </Box>
          <Button type="submit" variant="contained" sx={buttonStyle}>
            {commonLng.t(txtButton)}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

const cardContent = {
  display: 'flex',
  alignItems: 'center',
  height: '100%'
}

const boxBody = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  columnGap: 1,
  width: '100%'
}

const buttonStyle = {
  color: 'white',
  py: '5px',
  px: { xs: 1, lg: 4 },
  fontSize: { xs: 13, md: 15 },
  height: '39px',
  minWidth: { xs: '100px', lg: '120px' }
}
