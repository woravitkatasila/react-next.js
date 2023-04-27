/**
 * MUI
 **/
import { Typography } from '@mui/material'

interface Props {
  bgColor: string
  variant:
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'inherit'
    | undefined
  color: string
  text: JSX.Element | string
  width?: string
  height?: string
  component?: any
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  style?: any
  bottom?: number
  left?: string
  fontWeight?: number
}

export default function TextUnderline({
  bgColor,
  variant,
  color,
  text,
  width = '100%',
  height = '5px',
  component = 'span',
  align = 'center',
  style,
  bottom = -8,
  fontWeight = 400,
  left = '0'
}: Props) {
  const textDecorator = {
    position: 'relative',
    width: 'auto',
    fontWeight: fontWeight,
    ':after': {
      position: 'absolute',
      content: `""`,
      bottom: bottom,
      left: left,
      width: width,
      height: height,
      backgroundColor: bgColor
    }
  }

  return (
    <Typography variant={variant} component={component} align={align} color={color} sx={textDecorator} style={style}>
      {text}
    </Typography>
  )
}
