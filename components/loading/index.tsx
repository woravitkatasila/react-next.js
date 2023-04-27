import ReactLoading from 'react-loading'
/**
 * MUI
 **/
import { Dialog } from '@mui/material'

interface Props {
  isOpen: boolean
}

export default function Loading({ isOpen }: Props) {
  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        style: {
          boxShadow: 'none',
          background: 'none'
        }
      }}
    >
      <ReactLoading type="bubbles" color="#01AA8D" height={222} width={125} />
    </Dialog>
  )
}
