import { useTranslation } from 'next-i18next'
/**
 * MUI
 **/
import { Card, CardMedia, CardContent, CardActions, Typography, Stack } from '@mui/material'
/**
 * COMPONENTS
 **/
import TextUnderline from '@components/text-underline'
import EyeIcon from '@components/icons/eye'

interface Props {
  title: string
  img: string
  detail: string
  view: number
  handleClick: () => void
}

export default function ArticleCard({ title, img, detail, view, handleClick }: Props) {
  const commonLng = useTranslation('common')
  return (
    <Card sx={cardStyle} onClick={handleClick}>
      <Stack direction="column" height="100%">
        <CardMedia component="img" image={img} alt="service" sx={cardMedia} />
        <CardContent sx={{ p: '15px', display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row">
            <TextUnderline
              bgColor="primary.main"
              variant="body2"
              component="span"
              color="secondary.main"
              text={title}
              height="3px"
            />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={0.5} sx={{ minWidth: 70 }}>
            <EyeIcon />
            <Typography variant="body2" component="span" color="secondary.main">
              {view} {commonLng.t('view')}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions sx={cardAction}>
          <Typography variant="caption" component="div" color="body.contrastText" noWrap>
            {detail}
          </Typography>
        </CardActions>
      </Stack>
    </Card>
  )
}

const cardStyle = {
  cursor: 'pointer',
  borderRadius: 2,
  height: '100%'
}

const cardMedia = {
  tranformOrigin: 'center center',
  transition: 'transform 1s ease-in-out',
  objectFit: 'contain',
  maxHeight: '300px'
}

const cardAction = {
  p: '15px'
}
