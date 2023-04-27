import { Typography, Stack, Button } from '@mui/material'
import TextLink from '@components/text-link'
// import { BASE_URL } from '@constants/config'

export default function CookiesConsent() {
  return (
    <Stack direction="column" rowGap={2} py={{ xs: 2, sm: 3 }} px={{ xs: 2, sm: 10, md: 15 }}>
      <Typography variant="body2" color="body.main" component="span" align="center">
        เว็บไซต์ของเราใช้คุกกี้เพื่อพัฒนาประสิทธิภาพ และประสบการณ์ที่ดีในการใช้เว็บไซต์ของท่าน
        ท่านสามารถศึกษารายละเอียดได้ที่
        <TextLink link="/">นโยบายคุกกี้</TextLink>
        และสามารถจัดการความเป็นส่วนตัวของท่าน ได้ โดยคลิกที่ปุ่มตั้งค่า
      </Typography>
      <Stack direction="row" rowGap={2} p={{ xs: 0, sm: 2 }} justifyContent="center" columnGap={2}>
        <Button type="submit" variant="outlined">
          ตั้งค่า
        </Button>
        <Button type="submit" variant="contained" sx={{ color: 'white' }}>
          ยอมรับ
        </Button>
      </Stack>
    </Stack>
  )
}
