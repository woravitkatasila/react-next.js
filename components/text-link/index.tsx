import Link from 'next/link'
import { Typography } from '@mui/material'

interface Props {
  link: string
  children?: React.ReactNode
  variant?:
    | 'content'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'inherit'
}

export default function TextLink({ link, children, variant = 'body2' }: Props) {
  return (
    <Typography
      variant={variant}
      color="primary.main"
      component="span"
      align="center"
      sx={{ textDecoration: 'underline' }}
    >
      <Link href={link}>
        <a target="_blank" rel="noopener">
          {' '}
          {children}{' '}
        </a>
      </Link>
    </Typography>
  )
}
