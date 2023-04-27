import Image from 'next/image'
import { Typography, Box, Button } from '@mui/material'
import { styled } from '@mui/system'

export default function Contact() {
  return (
    <Box sx={main}>
      <Box sx={cloud}>
        <Image src="/images/contact/bg-clound.png" alt="cloud in contact" width={600} height={300} />
        <Box sx={detail}>
          <Typography variant="h5" color="white" component="div" sx={{ textAlign: 'center' }}>
            หากมีข้อสงสัย? <br />
            สอบถามได้ที่นี่
          </Typography>
          <Box sx={iconText}>
            <Image src="/images/icons/mail.svg" alt="mail Logo" width={20} height={16} />
            <Typography variant="body2" color="white" component="span">
              callcenter@thani.co.th
            </Typography>
          </Box>
          <Box>
            <Box sx={iconText}>
              <Image src="/images/icons/phone-white.svg" alt="white phone icon" width={15} height={20} />
              <Typography variant="body2" color="white" component="span">
                02-431-9000
              </Typography>
            </Box>
            <Typography variant="body2" color="white" component="span" sx={{ marginLeft: '25px' }}>
              Mon-Fri: 8.30-17.00
            </Typography>
          </Box>
          <Button variant="contained" sx={lineButoon}>
            <Image src="/images/logo/line-blue.svg" alt="line blue icon" width={25} height={25} />
            <TextLineButoon>เพิ่มเพื่อน</TextLineButoon>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

const main = {
  width: '100%',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '50px 0'
}

const cloud = {
  position: 'relative'
}

const detail = {
  position: 'absolute',
  top: '10%',
  right: '20%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gridRowGap: '15px'
}

const iconText = {
  display: 'flex',
  alignItems: 'center',
  gridColumnGap: '8px'
}

const lineButoon = {
  backgroundColor: 'white',
  color: '#3975DC',
  '&:hover': {
    backgroundColor: 'white'
  }
}

const TextLineButoon = styled('div')({
  marginLeft: '5px'
})
