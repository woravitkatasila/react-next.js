/**
 * MUI
 **/
import { Typography } from '@mui/material'
/**
 * COMPONENTS
 **/

interface Props {
  spacing?: number
}

export default function TextSpacing({ spacing = 8 }: Props) {
  return <Typography component="span" sx={{ ml: { xs: 3, sm: spacing } }}></Typography>
}
