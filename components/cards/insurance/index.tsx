import { useTranslation } from 'next-i18next'
/**
 * MUI
 **/
import { Card, Box, CardContent, Typography, Button } from '@mui/material'
/**
 * TYPE
 **/
import { IconProps } from '@type/global/icon'

interface Props {
  key: string
  icon: (props: IconProps) => JSX.Element
  name: string
  handleClick: () => void
}

export default function InsuranceCard({ icon: Icon, name, handleClick }: Props) {
  const commonLng = useTranslation('common')

  return (
    <Card sx={boxCard} onClick={handleClick}>
      <CardContent sx={{ height: '100%' }}>
        <Box sx={boxBody}>
          <Box sx={boxIcon}>
            <Icon />
          </Box>
          <Typography variant="subtitle1" component="span" align="center">
            {name}
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button variant="contained">
              <Typography variant="body2" color="white" component="div">
                {commonLng.t('contact')}
              </Typography>
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

const boxCard = {
  borderRadius: 2,
  height: '100%'
}

const boxBody = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  rowGap: '20px',
  marginTop: '5px',
  height: '100%'
}

const boxIcon = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px'
}
