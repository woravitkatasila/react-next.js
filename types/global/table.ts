import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'
export interface TableProps {
  text: string | React.ReactNode
  props: {
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
    rowSpan?: number
    colSpan?: number
    sx?: SxProps<Theme>
  }
  style?: React.CSSProperties
  isSticky?: boolean
}
