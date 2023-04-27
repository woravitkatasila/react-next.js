import Image from '@components/Image'
/**
 * MUI
 **/
import { Box, Typography } from '@mui/material'

import { BASE_URL } from '@constants/config'

interface Props {
  key: string
  icon?: string | null
  name: string
  active: boolean
  handleClick: () => void
}

export default function LoanSelectedCard({ icon, name, active, handleClick }: Props) {
  return (
    <Box sx={[card.default, active ? card.active : card.inactive]} onClick={handleClick}>
      <Box> {icon && <Image src={`${BASE_URL}${icon}`} alt="loan icon" width={55} height={55} unoptimized />}</Box>
      <Typography variant="subtitle2" color="secondary.dark" component="span" fontWeight={500}>
        {name}
      </Typography>
    </Box>
  )
}

const card = {
  default: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 2,
    width: '100%',
    height: '100%',
    background: 'white',
    border: '1px solid',
    cursor: 'pointer',
    rowGap: 2,
    py: 3,
    px: 2
  },
  inactive: {
    borderColor: '#E0E0E0'
  },
  active: {
    borderColor: 'primary.main'
  }
}
