/**
 * MUI
 **/
import { Card } from '@mui/material'

interface Props {
  children?: React.ReactNode
  borderRadius?: number
}

export default function ContentCard({ children, borderRadius = 0 }: Props) {
  const boxCard = {
    backgroundColor: 'white',
    boxShadow: 0,
    borderRadius: borderRadius,
    height: '100%'
  }
  return <Card sx={boxCard}>{children}</Card>
}
