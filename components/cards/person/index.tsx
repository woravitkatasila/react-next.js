import { useState } from 'react'
import Image from '@components/Image'
import { useTranslation } from 'next-i18next'

/**
 * MUI
 **/
import { CardContent, Typography, Box } from '@mui/material'

/**
 * COMPONENTS
 **/
import ContentCard from '@components/cards/content'

interface Props {
  name: string
  position: string
  dateOfAppointment: string
  age: string
  education: string[]
  img: string
  imgWidth?: number
  imgHeight?: number
  readMore: () => void
}

export default function PersonCard({
  name,
  position,
  dateOfAppointment,
  age,
  education,
  img,
  imgWidth = 255,
  imgHeight = 272,
  readMore
}: Props) {
  const [isHovering, setIsHovering] = useState(false)
  const commonLng = useTranslation('common')

  return (
    <Box
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={readMore}
      sx={container}
    >
      <ContentCard>
        <Box sx={card}>
          <Box
            sx={[
              cardHover,
              isHovering && { opacity: 0 },
              {
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  display: 'none'
                },
                '&::-webkit-overflow-scrolling': {
                  display: 'touch'
                }
              }
            ]}
          >
            <Typography variant="body2" component="div" color="white" fontSize={14}>
              {commonLng.t('dateOfAppointment')} : {dateOfAppointment}
            </Typography>
            <Typography variant="body2" component="div" color="white" fontSize={14}>
              {commonLng.t('age')} : {age} {commonLng.t('year')}
            </Typography>
            <Typography variant="body2" component="div" color="white" fontSize={14}>
              {commonLng.t('education')} :
            </Typography>
            {education &&
              education.map((item) => (
                <Typography variant="body2" component="div" color="white" fontSize={14} key={item}>
                  • {item}
                </Typography>
              ))}
          </Box>
          <Image src={img} alt="manager profile" width={imgWidth} height={imgHeight} />
        </Box>

        <CardContent>
          <Box sx={boxName}>
            <Typography
              variant="body1"
              component="div"
              color="secondary.main"
              lineHeight={1.3}
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: name }}
            ></Typography>
          </Box>
          <Typography
            variant="caption"
            component="div"
            color="body.main"
            lineHeight={1.2}
            mt={1.5}
            sx={{ '& p': { m: 0 } }}
            className="ck-content"
            dangerouslySetInnerHTML={{ __html: position }}
          ></Typography>
          <Typography
            variant="caption"
            component="div"
            color="secondary.main"
            mt={1.5}
            display={{ xs: 'block', sm: 'none' }}
            sx={{ pb: { xs: 3, sm: 1 } }}
          >
            {commonLng.t('readMore')}
          </Typography>
        </CardContent>
      </ContentCard>
    </Box>
  )
}

const container = {
  cursor: 'pointer',
  width: '255px'
}

const card = {
  height: '300px',
  background: `url('/images/backgrounds/person-card.jpg')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center'
}

const cardHover = {
  width: '100%',
  height: '100%',
  background: 'linear-gradient( to bottom , #0B5D99 0%, #0B5D99 50%, rgba(11, 93, 153, 0) 130%)',
  opacity: 0,
  transition: 'opacity 0.5s ease-in-out',
  p: '30px 20px',
  display: 'flex',
  flexDirection: 'column',
  rowGap: 2,
  position: 'absolute',
  bottom: 0,
  zIndex: 99
}

const boxName = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  flexWrap: 'wrap',
  rowGap: 0.5
}
