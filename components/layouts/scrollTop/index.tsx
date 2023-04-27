/**
 * MUI
 **/
import { useScrollTrigger, Fade, Box } from '@mui/material'

interface Props {
  window?: () => Window
  children?: React.ReactNode // มันมีซ้ำกันเลยไม่ส่ง
}

export default function ScrollTop({ window, children }: Props) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      })
    }
  }

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 100, right: 50, zIndex: 999 }}>
        {children}
      </Box>
    </Fade>
  )
}
