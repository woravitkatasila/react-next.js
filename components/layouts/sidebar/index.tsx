import { Fragment, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

/**
 * MUI
 **/
import { Divider, Drawer, List, ListItemButton, Typography, Collapse, Stack, IconButton } from '@mui/material'

/**
 * COMPONENTS
 **/
import ArrowUpIcon from '@components/icons/arrowUp'
import ArrowDownIcon from '@components/icons/arrowDown'

/**
 * CONSTANTS
 **/
import navbars from '@constants/navbar'
import subNavbars from '@constants/subNavbars'

interface Props {
  open: boolean
  changeOpen: () => void
}
interface GetNavbars {
  staticNav: string
  path?: string
  navbars?: Array<{
    key: string
    path?: string
    subNav?: Array<{ key: string; path: string }>
  }>
}

export default function Sidebar({ open, changeOpen }: Props) {
  const router = useRouter()
  const { t } = useTranslation('navbar')
  const [staticNavIdx, setStaticNavIdx] = useState<number | null>(null)
  const [navbarIdx, setNavbarIdx] = useState<number | null>(null)

  const getNavbars = useMemo((): GetNavbars[] => {
    let result: GetNavbars[] = [
      {
        staticNav: 'home',
        path: '/'
      },
      {
        staticNav: 'loan',
        navbars: subNavbars.loan.map((subNav) => {
          return {
            key: subNav.key,
            path: subNav.path
          }
        })
      },
      {
        staticNav: 'service',
        navbars: navbars.service.map((navbar) => {
          let subNav = Object.entries(subNavbars).find((item) => item[0] === navbar.key)
          return {
            key: navbar.key,
            path: navbar.path,
            subNav: subNav ? subNav[1] : []
          }
        })
      },
      {
        staticNav: 'news-and-event',
        navbars: subNavbars['news-and-event'].map((subNav) => {
          return {
            key: subNav.key,
            path: subNav.path
          }
        })
      },
      {
        staticNav: 'investor-relations',
        navbars: navbars['investor-relations'].map((navbar) => {
          let subNav = Object.entries(subNavbars).find((item) => item[0] === navbar.key)
          return {
            key: navbar.key,
            path: navbar.path,
            subNav: subNav ? subNav[1] : []
          }
        })
      },
      {
        staticNav: 'contact-us',
        path: '/contact-us',
        navbars: subNavbars['contact-us'].map((subNav) => {
          return {
            key: subNav.key,
            path: subNav.path
          }
        })
      }
    ]

    return result
  }, [router])

  const pushLink = (path: string) => {
    router.push(`/${router.query.locale}${path}`)
    changeOpen()
  }

  const selectStaticNavbar = (_path: string | undefined, idx: number) => {
    if (staticNavIdx === idx) setStaticNavIdx(null)
    else {
      setStaticNavIdx(idx)
      setNavbarIdx(null)
    }
  }

  const selectNavbar = (
    subNav: Array<{ key: string; path: string }> | undefined,
    path: string | undefined,
    idx: number,
    navIdx: number
  ) => {
    if ((path && !subNav) || (path && subNav?.length === 0)) pushLink(path)
    else {
      if (idx === staticNavIdx && navIdx === navbarIdx) setNavbarIdx(null)
      else setNavbarIdx(navIdx)
    }
  }

  return (
    <Drawer open={open} variant="temporary" anchor="left" sx={drawerStyle}>
      <Divider />

      <List sx={{ width: '100%', p: 0 }} component="nav" aria-labelledby="nested-list-subheader">
        {getNavbars.map((item, idx) => (
          <Fragment key={item.staticNav}>
            <ListItemButton sx={[ListItemButtonStyle, idx === staticNavIdx && ListItemButtonActiveStyle]}>
              <Typography
                variant="body1"
                component="span"
                sx={{ width: '90%' }}
                onClick={() => {
                  item.path ? pushLink(item.path) : selectStaticNavbar(item.path, idx)
                }}
              >
                {item.staticNav === 'contact-us' ? t(`navbar.${item.staticNav}`) : t(`staticNavbar.${item.staticNav}`)}
              </Typography>
              {item.navbars && (
                <IconButton sx={{ width: 40, height: 40 }} onClick={() => selectStaticNavbar(item.path, idx)}>
                  {idx === staticNavIdx ? (
                    <ArrowUpIcon color={idx === staticNavIdx ? 'white' : '#636363'} />
                  ) : (
                    <ArrowDownIcon color="#636363" />
                  )}
                </IconButton>
              )}
            </ListItemButton>
            <Divider />

            {item.navbars &&
              item.navbars.map((navbar, navIdx) => (
                <Collapse in={Boolean(idx === staticNavIdx)} timeout="auto" unmountOnExit key={navbar.key}>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={[ListItemButtonStyle, { pl: 6 }]}
                      onClick={() => selectNavbar(navbar.subNav, navbar.path, idx, navIdx)}
                    >
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{ width: '90%' }}
                        color={idx === staticNavIdx && navIdx === navbarIdx ? 'secondary.main' : ''}
                      >
                        {item.staticNav === 'news-and-event' ||
                        item.staticNav === 'loan' ||
                        item.staticNav === 'contact-us'
                          ? t(`subNavbar.${navbar.key}`)
                          : t(`navbar.${navbar.key}`)}
                      </Typography>
                      {navbar.subNav && navbar.subNav.length !== 0 && (
                        <IconButton sx={{ width: 40, height: 40 }}>
                          {idx === staticNavIdx && navIdx === navbarIdx ? (
                            <ArrowUpIcon color="#636363" />
                          ) : (
                            <ArrowDownIcon color="#636363" />
                          )}
                        </IconButton>
                      )}
                    </ListItemButton>

                    {navbar.subNav &&
                      navbar.subNav.map((subNav) => (
                        <Collapse
                          in={Boolean(idx === staticNavIdx && navIdx === navbarIdx)}
                          timeout="auto"
                          unmountOnExit
                          key={subNav.key}
                        >
                          <List component="div" disablePadding>
                            <ListItemButton
                              sx={[ListItemButtonStyle, { pl: 10 }]}
                              onClick={() => pushLink(subNav.path)}
                            >
                              <Typography variant="body1" component="span" color="body.contrastText">
                                {t(`subNavbar.${subNav.key}`)}
                              </Typography>
                            </ListItemButton>
                          </List>
                        </Collapse>
                      ))}
                    <Divider />
                  </List>
                </Collapse>
              ))}
          </Fragment>
        ))}
      </List>

      <Stack direction="row" justifyContent="center" my={3}>
        <Link href={router.asPath.replace('/en', '/th')}>
          <a style={{ marginRight: '5px' }}>
            <Typography variant="body1" sx={[typographyStyle, router.query.locale !== 'th' && typographyInActiveStyle]}>
              TH
            </Typography>
          </a>
        </Link>
        <Typography variant="body1" sx={[typographyInActiveStyle, { mr: '5px' }]}>
          |
        </Typography>
        <Link href={router.asPath.replace('/th', '/en')}>
          <a>
            <Typography variant="body1" sx={[typographyStyle, router.query.locale !== 'en' && typographyInActiveStyle]}>
              EN
            </Typography>
          </a>
        </Link>
      </Stack>
    </Drawer>
  )
}

const drawerStyle = {
  display: { xs: 'flex', md: 'none' },
  flexShrink: 0,
  position: 'relative',
  [`& .MuiBackdrop-root`]: { top: '90px', paddingBottom: '90px' },
  [`& .MuiDrawer-paper`]: {
    width: '100vw',
    boxSizing: 'border-box',
    top: '90px',
    paddingBottom: '90px',
    boxShadow: 'none'
  }
}

const ListItemButtonStyle = {
  justifyContent: 'flex-start',
  height: '53px'
}

const ListItemButtonActiveStyle = {
  backgroundColor: 'secondary.main',
  color: 'white',
  '&:hover': {
    backgroundColor: 'secondary.main',
    color: 'white'
  }
}

const typographyStyle = {
  color: 'secondary.main',
  opacity: 1,
  fontWeight: 500,
  '&:hover': {
    opacity: 1,
    fontWeight: 500
  }
}
const typographyInActiveStyle = {
  opacity: 0.7,
  fontWeight: 400
}
