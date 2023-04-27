import { useState, useMemo } from 'react'
import Image from '@components/Image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

/**
 * MUI
 **/
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  IconButton
} from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/system'

/**
 * COMPONENTS
 **/
import Sidebar from '@components/layouts/sidebar'
import HamburgerIcon from '@components/icons/hamburger'
import CloseIcon from '@components/icons/close'

/**
 * CONSTANTS
 **/
import navbars from '@constants/navbar'

/**
 * TYPES
 **/
import type { Navbars } from '@type/global/navbar'

interface Props {
  phone: string
}
export default function Navbar({ phone }: Props) {
  const { t } = useTranslation('navbar')
  const router = useRouter()
  const [isOpenTooltip, setIsOpenTooltip] = useState<boolean[]>([false])
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

  const togleTooltip = (index: number, value: boolean) => () => {
    setIsOpenTooltip((prev) => {
      const newArr = [...prev]
      newArr[index] = value
      return newArr
    })
  }

  const getAsPath = useMemo(() => {
    return router.asPath.split('/')
  }, [router])

  const getNavbars = useMemo((): Navbars => {
    let result: Navbars = navbars.home
    for (const item of Object.entries(navbars)) {
      if (item[0] === getAsPath[2]) result = item[1]
    }
    return result
  }, [router])

  const pagination = {
    clickable: true,
    renderBullet: function (_index: number, className: string) {
      return '<span style="display:none" class="' + className + '"></span>'
    }
  }
  return (
    <AppBar position="sticky" sx={appBarStyle}>
      <Toolbar sx={toolbarStyle}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', minWidth: 162, minHeight: 60 }}>
          <Link href={`/${router.query.locale}/`} passHref>
            <EmptyLink>
              <Image
                src="/images/logo/LOGO_THANI2.jpg"
                alt="Logo of Ratchathani"
                width={162}
                height={60}
                unoptimized={true}
              />
            </EmptyLink>
          </Link>
        </Box>
        <Stack direction="row" sx={navbarStyle} display={{ xs: 'none', md: 'flex' }}>
          <Swiper
            pagination={pagination}
            modules={[Pagination, Navigation]}
            spaceBetween={15}
            slidesPerView={'auto'}
            navigation={true}
            //  centeredSlides={true}
          >
            {getNavbars &&
              getNavbars.map((item, idx) =>
                item.subItems ? (
                  <CustomizeTooltip
                    key={idx}
                    open={Boolean(isOpenTooltip[idx])}
                    onOpen={togleTooltip(idx, true)}
                    onClose={togleTooltip(idx, false)}
                    placement="bottom-start"
                    title={
                      <List sx={list}>
                        {item.subItems.map((subItem, subIdx) => (
                          <Link href={`/${router.query.locale}${subItem.path}`} key={subIdx}>
                            <ListItem dense disablePadding key={subIdx}>
                              <ListItemButton>
                                <ListItemText
                                  primary={subItem.key}
                                  sx={[router.asPath === subItem.path && typographyActiveStyle]}
                                />
                              </ListItemButton>
                            </ListItem>
                          </Link>
                        ))}
                      </List>
                    }
                  >
                    <Typography
                      variant="body2"
                      sx={[
                        typographyStyle,
                        item.subItems.includes({ key: 'test4', path: router.asPath }) && typographyActiveStyle
                      ]}
                      component="span"
                      onClick={togleTooltip(idx, !isOpenTooltip[idx])}
                    >
                      {t(`navbar.${item.key}`)}
                    </Typography>
                  </CustomizeTooltip>
                ) : (
                  <SwiperSlide key={idx}>
                    <Link href={`/${router.query.locale}${item.path}`}>
                      <a>
                        <Typography
                          variant="body2"
                          sx={[
                            typographyStyle,
                            (getAsPath[3] === item.key ||
                              (getAsPath[2] === 'loan' && getAsPath[2] === item.key) ||
                              (getAsPath[2] === 'contact-us' && getAsPath[2] === item.key)) &&
                              typographyActiveStyle,
                            { whiteSpace: 'nowrap' }
                          ]}
                          component="div"
                        >
                          {t(`navbar.${item.key}`)}
                        </Typography>
                      </a>
                    </Link>
                  </SwiperSlide>
                )
              )}
          </Swiper>
          {getNavbars[0].key === 'loan' && (
            <Link href={`tel:${phone.replaceAll('-', '')}`}>
              <a style={{ display: 'inline-flex', alignItems: 'center' }}>
                <Image
                  src="/images/icons/phone-green.svg"
                  alt="green phone icon"
                  width={15}
                  height={20}
                  unoptimized={true}
                />
                <Typography variant="body2" color="primary.main" fontWeight={500} ml="5px" component="span">
                  {phone}
                </Typography>
              </a>
            </Link>
          )}
        </Stack>
        <IconButton
          sx={{ display: { xs: 'flex', md: 'none' } }}
          size="large"
          aria-label="hamburger"
          onClick={() => setIsOpenDrawer(!isOpenDrawer)}
        >
          {isOpenDrawer ? <CloseIcon /> : <HamburgerIcon />}
        </IconButton>
      </Toolbar>
      <Sidebar open={isOpenDrawer} changeOpen={() => setIsOpenDrawer(!isOpenDrawer)} />
    </AppBar>
  )
}

const appBarStyle = {
  boxShadow: '0 2px 5px rgb(0 0 0 / 8%);',
  bgcolor: 'white',
  '& .MuiToolbar-root': { minHeight: '60px' }
}

const toolbarStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  columnGap: 3,
  p: { xs: '15px', md: '10px 60px' },
  '& .swiper': {
    px: 3.5
  },
  '& .swiper-slide': {
    width: 'auto'
  },
  '& .swiper-button-prev': {
    backgroundColor: 'white',
    left: 0,
    ':after': { fontSize: 15 }
  },
  '& .swiper-button-next': {
    backgroundColor: 'white',
    right: 0,
    ':after': { fontSize: 15 }
  },
  '& .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled ': {
    opacity: 1
  }
}

const typographyStyle = {
  fontWeight: '500',
  color: 'body.light',
  '&:hover': {
    color: 'body.main'
  },
  cursor: 'pointer',
  height: '60px',
  display: 'flex',
  alignItems: 'center'
}

const typographyActiveStyle = {
  color: 'body.main'
}

const navbarStyle = {
  //maxWidth: '993px',
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  '&::-webkit-overflow-scrolling': {
    display: 'touch'
  }
}

const list = {
  p: '0',
  '& .MuiListItemButton-root:hover': {
    bgcolor: 'primary.main',
    '&, & .MuiListItemIcon-root': { color: 'white' }
  }
}

const EmptyLink = styled('div')({
  display: 'flex',
  cursor: 'pointer'
})

const CustomizeTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: theme.palette.body.main,
    width: 250,
    border: '1px solid #dadde9',
    padding: '0'
  }
}))
