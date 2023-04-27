/**
 * MUI
 **/
import { Box } from '@mui/material'
/**
 * COMPONENTS
 **/
import DotIcon from '@components/icons/dot'

interface Props {
  children?: React.ReactNode
  align?: string
  margin?: string
  columnGap?: number
}

export default function TextDot({ children, align = 'flex-start', margin = '0', columnGap = 2 }: Props) {
  const container = {
    display: 'flex',
    alignItems: align,
    columnGap: columnGap
  }

  return (
    <Box sx={container}>
      <Box sx={{ m: margin }}>
        <DotIcon />
      </Box>
      {children}
    </Box>
  )
}
