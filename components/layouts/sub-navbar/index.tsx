import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
/**
 * MUI
 **/
import { AppBar, Toolbar, Typography, Stack, Breadcrumbs } from '@mui/material'

/**
 * CONSTANTS
 **/
import subNavbars from '@constants/subNavbars'

/**
 * TYPES
 **/
import type { Navbars } from '@type/global/navbar'

export default function SubNavbar() {
  const { t } = useTranslation('navbar')
  const router = useRouter()

  const getAsPath = useMemo(() => {
    return router.asPath.split('/')
  }, [router])

  const getNavbars = useMemo((): Navbars => {
    let result: Navbars = []
    for (const item of Object.entries(subNavbars)) {
      if (getAsPath[2] === 'contact-us' || getAsPath[2] === 'loan' || getAsPath[2] === 'news-and-event') {
        if (item[0] === getAsPath[2]) result = item[1]
      }
      if (item[0] === getAsPath[3]) result = item[1]
    }
    return result
  }, [router])

  const getNavName = (key: string, idx: number): string | undefined => {
    if (getAsPath[2] === 'contact-us' || getAsPath[2] === 'apply-for-loan') {
      switch (idx) {
        case 2:
          return t(`navbar.${key}`)
        case 3:
          return t(`subNavbar.${key}`)
        default:
          return undefined
      }
    }
    if (getAsPath[2] === 'loan' || getAsPath[2] === 'news-and-event') {
      switch (idx) {
        case 2:
          return t(`staticNavbar.${key}`)
        case 3:
          return t(`subNavbar.${key}`)
        case 4:
        //  return decodeURI(key)
        default:
          return undefined
      }
    }

    if (getAsPath[4] === 'board-of-directors') {
      switch (idx) {
        case 2:
          return t(`staticNavbar.${key}`)
        case 3:
          return t(`navbar.${key}`)
        case 4:
          return t(`subNavbar.${key}`)
        case 5:
        //  return decodeURI(key)
        default:
          return undefined
      }
    }
    switch (idx) {
      case 2:
        return t(`staticNavbar.${key}`)
      case 3:
        return t(`navbar.${key}`)
      case 4:
        return t(`subNavbar.${key}`)
      default:
        return undefined
    }
  }

  const pagination = {
    clickable: true,
    renderBullet: function (_index: number, className: string) {
      return '<span style="display:none" class="' + className + '"></span>'
    }
  }
  return (
    <>
      {getNavbars.length !== 0 && (
        <AppBar position="relative" sx={appBarStyle}>
          <Toolbar sx={toolbarStyle}>
            <Swiper
              pagination={pagination}
              modules={[Pagination, Navigation]}
              spaceBetween={16}
              slidesPerView={'auto'}
              navigation={true}
            >
              {getNavbars.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <Link href={`/${router.query.locale}${item.path}`}>
                    <a>
                      <Typography
                        variant="body2"
                        sx={[
                          typographyStyle,
                          (getAsPath[4] === item.key ||
                            (getAsPath[3] === item.key && getAsPath[2] === 'contact-us') ||
                            (getAsPath[3] === item.key && getAsPath[2] === 'loan') ||
                            (getAsPath[3] === item.key && getAsPath[2] === 'news-and-event')) &&
                            typographyActiveStyle
                        ]}
                        component="div"
                        align="center"
                      >
                        {t(`subNavbar.${item.key}`)}
                      </Typography>
                    </a>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Toolbar>
        </AppBar>
      )}
      <Stack sx={[boxNav, getNavbars.length === 0 && { mt: 2 }]}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {getAsPath.length > 4 &&
            getAsPath.map(
              (e: string, idx: number) =>
                e &&
                getNavName(e, idx) && (
                  <Typography
                    key={e}
                    variant="body2"
                    color="body.light"
                    sx={[idx === getAsPath.length - 2 && breadcrumbsActiveStyle]}
                    component="span"
                    fontSize={{ xs: 13, sm: 16 }}
                  >
                    {getNavName(e, idx)}
                  </Typography>
                )
            )}
        </Breadcrumbs>
      </Stack>
    </>
  )
}

const appBarStyle = {
  display: { xs: 'none', md: 'flex' },
  boxShadow: '0 2px 5px rgb(0 0 0 / 8%);',
  bgcolor: 'white',
  '& .MuiToolbar-root': {
    minHeight: '60px'
  }
}

const toolbarStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  px: { xs: '5%', sm: '5%' },
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

// const scrollContainer = {
//   margin: 'auto',
//   maxHeight: '100%',
//   overflowX: 'auto',
//   '&::-webkit-scrollbar': {
//     display: 'none'
//   },
//   '&::-webkit-overflow-scrolling': {
//     display: 'touch'
//   }
// }

const typographyStyle = {
  whiteSpace: 'nowrap',
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
  color: 'secondary.main',
  '&:hover': {
    color: 'secondary.main'
  }
}
const breadcrumbsActiveStyle = {
  color: 'body.main',
  '&:hover': {
    color: 'body.main'
  }
}

const boxNav = {
  p: { xs: '10px 4%', sm: '10px 8%' }
}
