/**
 * COMPONENTS
 **/
import { Dialog, Box, IconButton } from '@mui/material'
/**
 * COMPONENTS
 **/
import CloseIcon from '@components/icons/close'

interface Props {
  children?: React.ReactNode
  open: boolean
  onClose: () => void
  height?: string
}

export default function DialogBase({ open, onClose, children, height = '100vh' }: Props) {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            maxWidth: '1400px',
            height: height
          }
        }}
      >
        <Box sx={boxDialog}>
          <Box sx={boxHeader}>
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 1 }}>{children}</Box>
        </Box>
      </Dialog>
    </>
  )
}

const boxDialog = {
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column'
}

const boxHeader = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  p: 1
}
