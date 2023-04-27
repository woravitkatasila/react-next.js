import { useState, useEffect } from 'react'
/**
 * MUI
 **/
import { Fab, Box } from '@mui/material'

/**
 * COMPONENTS
 **/
import StaticNavbar from '@components/layouts/static-navbar'
import Navbar from '@components/layouts/navbar'
import Footer from '@components/layouts/footer'
import ScrollTop from '@components/layouts/scrollTop'
import ScrollArrowIcon from '@components/icons/scrollArrow'
// import CookiesConsent from '@components/layouts/footer/cookies-consent'
/**
 * API
 **/
import branchesApi from '@api/branches'

interface Props {
  isVisibleCityBg?: boolean
  window?: () => Window
  children?: React.ReactNode
}

export default function HomeLayout({ isVisibleCityBg = true, children, window }: Props) {
  const [defaultBranch, setDefaultBranch] = useState({
    address: '',
    branchName: '',
    company: '',
    email: '',
    facebook: '',
    fax: '',
    id: 1 as number | null,
    line: '',
    lineQrcode: '',
    location: '',
    tel: ''
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await branchesApi.findOne(1)
        setDefaultBranch(data.TH)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div id="back-to-top-anchor"> </div>
      <StaticNavbar />
      <Navbar phone={defaultBranch.tel} />
      <Box sx={container}>
        <main>{children}</main>
        <ScrollTop window={window}>
          <Fab size="small" aria-label="scroll back to top">
            <ScrollArrowIcon color="#EE3741" />
          </Fab>
        </ScrollTop>
        {isVisibleCityBg && <Box sx={bgCity}></Box>}
      </Box>
      <Footer
        phone={defaultBranch.tel}
        facebook={defaultBranch.facebook}
        email={defaultBranch.email}
        lineId={defaultBranch.line}
        lineQrcode={defaultBranch.lineQrcode}
      />
      {/* <Box sx={boxCookiesConsent}>
        <CookiesConsent />
      </Box> */}
    </>
  )
}

const container = {
  backgroundImage: 'url("/images/backgrounds/main-background.jpg")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center center'
}
const bgCity = {
  mt: 10,
  width: '100%',
  height: '470px',
  backgroundImage: 'url("/images/backgrounds/city.png")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center center'
}

// const boxCookiesConsent = {
//   position: 'fixed',
//   bottom: 0,
//   left: 0,
//   width: '100%',
//   backgroundColor: 'white',
//   boxShadow: '-1px 1px 9px rgb(0 0 0 / 5%)'
// }
