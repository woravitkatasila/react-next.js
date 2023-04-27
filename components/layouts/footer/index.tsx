import Image from '@components/Image'

/**
 * MUI
 **/
import { Grid, Typography, Box } from '@mui/material'
import { styled } from '@mui/system'

/**
 * COMPONENTS
 **/
import Information from '@components/layouts/footer/information'
import List from '@components/layouts/footer/list'
/**
 * CONSTANTS
 **/
import navbars from '@constants/navbar'
import subNavbars from '@constants/subNavbars'

interface Props {
  phone: string
  facebook: string
  email: string
  lineId: string
  lineQrcode: string
}

export default function Footer({ phone, facebook, email, lineId, lineQrcode }: Props) {
  const BoxLogo = () => (
    <Box sx={boxLogoStyle}>
      {/* <Image src="/images/logo/policy.png" alt="Logo of Ratchathani" width={168} height={75} unoptimized={true} />
      <Image src="/images/logo/corruption.png" alt="Logo of Ratchathani" width={161} height={52} unoptimized={true} /> */}
      <Image src="/images/logo/LOGO_CAC.png" alt="Logo of Ratchathani" width={168} height={75} unoptimized={true} />
    </Box>
  )

  return (
    <>
      <FooterBox>
        <Grid container rowGap={3} sx={{ justifyContent: { xs: 'flex-start', lg: 'space-between' } }}>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <List title="staticNavbar.service" navbars={navbars.service} type="navbar" />
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <BoxLogo />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <List title="staticNavbar.news-and-event" navbars={subNavbars['news-and-event']} type="subNavbar" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <List title="staticNavbar.investor-relations" navbars={navbars['investor-relations']} type="navbar" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <List title="navbar.contact-us" navbars={subNavbars['contact-us']} type="subNavbar" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <Information phone={phone} facebook={facebook} email={email} lineId={lineId} lineQrcode={lineQrcode} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} sx={{ display: { xs: 'flex', lg: 'none' } }}>
            <BoxLogo />
          </Grid>
        </Grid>
      </FooterBox>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 1, backgroundColor: 'white' }}>
        <Typography variant="caption" color="secondary.main" component="span" fontSize={14}>
          © Copyright 2023 Ratchthani All Rights Reserved.
        </Typography>
      </Box>
    </>
  )
}

const FooterBox = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.secondary.main,
  padding: '60px 8%'
}))

const boxLogoStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  rowGap: '1rem',
  mt: '20px'
}
