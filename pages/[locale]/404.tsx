import Image from '@components/Image'
import { Stack, Typography } from '@mui/material'

function Error404() {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Image src="/images/backgrounds/404.svg" alt="arrow right icon" width={500} height={500} unoptimized />
      <Stack direction="row" columnGap={3} alignItems="center" flexWrap="wrap" px={2}>
        <Typography variant="h3" component="p" align="center" color="secondary.main">
          404
        </Typography>
        <Typography variant="h4" component="p" align="center" color="secondary.main">
          Page not found
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Error404
