/**
 * COMPONENTS
 **/
import { Box } from '@mui/material'

import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'

interface Props {
  html: string
  sx?: SxProps<Theme>
}

export default function DisplayContent({ html, sx }: Props) {
  return (
    <Box
      className="ck-content"
      sx={sx}
      dangerouslySetInnerHTML={{
        __html: html
      }}
    ></Box>
  )
}
