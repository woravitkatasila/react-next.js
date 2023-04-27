import { ReactElement, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '@lib/getStatic'

/**
 * MUI
 **/
import { Box, Typography, Grid, Stack } from '@mui/material'
/**
 * COMPONENTS
 **/
import HomeLayout from '@components/layouts/home'
import ImageCarousel from '@components/image-carousel'
import HomeForm from '@components/forms/home'
import LoanCard from '@components/cards/loan'
import ServiceCard from '@components/cards/service'
import CalculateCard from '@components/cards/calculate'
import Loading from '@components/loading'
/**
 * CONSTANTS
 **/
import { services, serviceCalc } from '@constants/service'
import { TITLE_COMPANY_NAME } from '@constants/config'

/**
 * API
 **/
import type { FindAll as LoanTypesFindAll } from '@type/api/loan-types'
import type { FindAll as CarTypesFineAll } from '@type/api/car-types'
import type { FindAll as BannersFindAll } from '@type/api/banners'
import loanTypesApi from '@api/loan-types'
import carTypesApi from '@api/car-types'
import bannersApi from '@api/banners'

/**
 * UTILS
 **/
import checkIsTHLocale from '@utils/isTHLocale'

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}

const getStaticProps = makeStaticProps(['title', 'navbar', 'common'])
export { getStaticPaths, getStaticProps }

export default function Home() {
  const titleLng = useTranslation('title')
  const commonLng = useTranslation('common')
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [loanTypes, setLoanTypes] = useState<LoanTypesFindAll[]>([])
  const [carTypes, setCarTypes] = useState<CarTypesFineAll[]>([])
  const [banners, setBanners] = useState<BannersFindAll>({
    time: 5,
    data: []
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: loanTypesData } = await loanTypesApi.findAll({ page: 1, pageLimit: 100 })
        const { data: carTypesData } = await carTypesApi.findAll({ page: 1, pageLimit: 100 })
        const { data: bannersData } = await bannersApi.findAll({ page: 1, pageLimit: 100 })
        setLoanTypes(
          loanTypesData.map((item) => {
            return {
              ...item,
              loanTypeName: checkIsTHLocale(String(router.query.locale)) ? item.loanTypeNameTH : item.loanTypeNameEN,
              content: checkIsTHLocale(String(router.query.locale)) ? item.contentTH : item.contentEN
            }
          })
        )

        setCarTypes(
          carTypesData.map((item) => {
            return {
              ...item,
              carTypeName: checkIsTHLocale(String(router.query.locale)) ? item.carTypeNameTH : item.carTypeNameEN,
              content: checkIsTHLocale(String(router.query.locale)) ? item.contentTH : item.contentEN
            }
          })
        )
        setBanners(bannersData)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>
          {titleLng.t('home')} - {TITLE_COMPANY_NAME}
        </title>
      </Head>
      <Loading isOpen={loading} />
      <ImageCarousel
        time={banners.time}
        banners={banners.data.map(({ filePath, filePathMobile, link }) => ({
          image: filePath,
          imageMobile: filePathMobile,
          link
        }))}
      />
      {!loading && (
        <Stack direction="column" rowGap={{ xs: 5, lg: 8 }}>
          <Box sx={boxClound}>
            <Box>
              <HomeForm loanTypes={loanTypes} carTypes={carTypes} />
            </Box>
          </Box>

          <Stack direction="column" rowGap={{ xs: 5, lg: 15 }} px={{ xs: 2, sm: 6, md: 8, lg: 20 }}>
            <Stack direction="column" rowGap={5}>
              <Typography variant="h5" component="h1" align="center" color="secondary.main" fontWeight={600}>
                {commonLng.t('loanType')}
              </Typography>
              <Grid container spacing={2}>
                {loanTypes.map(({ loanTypeName, icon, loanTypeId }, idx) => (
                  <Grid item xs={6} lg={4} key={idx}>
                    <LoanCard
                      name={loanTypeName || ''}
                      icon={icon}
                      key={loanTypeId}
                      readMore={() => router.push(`${router.asPath}loan/loan-types/detail?id=${loanTypeId}`)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>

            <Stack direction="column" rowGap={5}>
              <Typography variant="h5" component="h2" align="center" color="secondary.main" fontWeight={600}>
                {commonLng.t('service')}
              </Typography>
              <Grid container spacing={3}>
                {services.map(({ title, img, path }, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <ServiceCard title={title} img={img} handleClick={() => router.push(`${router.asPath}/${path}`)} />
                  </Grid>
                ))}
              </Grid>
            </Stack>

            <Grid container spacing={3}>
              {serviceCalc.map(({ title, subTitle, txtButton, img, imgBlur, path }, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <CalculateCard
                    handleClick={() => router.push(`${router.asPath}${path}`)}
                    title={title}
                    subTitle={subTitle}
                    txtButton={txtButton}
                    img={img}
                    imgBlur={imgBlur}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      )}
    </>
  )
}

const boxClound = {
  px: { xs: 2, sm: 6, md: 8, lg: 20 },
  py: '30px',
  backgroundImage: 'url("/images/backgrounds/header-clound.png")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center center'
}
