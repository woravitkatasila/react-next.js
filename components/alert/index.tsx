import { useTranslation } from 'next-i18next'
import { Snackbar, Alert } from '@mui/material'

interface Props {
  isOpen: boolean
  onClose: () => void
  severity: 'success' | 'error'
  text: string
}

export default function AlertCustom({ isOpen, onClose, severity, text }: Props) {
  const commonLng = useTranslation('common')

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {commonLng.t(text)}
      </Alert>
    </Snackbar>
  )
}
