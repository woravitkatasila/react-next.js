import { ReactElement, useState, useEffect } from 'react'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '@lib/getStatic'
import { useRouter } from 'next/router'

/**
 * MUI
 **/
import { Typography, Stack, Grid } from '@mui/material'

/**
 * COMPONENTS
 **/
import DefaultLayout from '@components/layouts/default'
import ArticleCard from '@components/cards/article'
import Loading from '@components/loading'

/**
 * CONSTANTS
 **/
import { banners } from '@constants/banner'
import { BASE_URL } from '@constants/config'
import { TITLE_COMPANY_NAME } from '@constants/config'
/**
 * API
 **/
import type { FindAllData as ArticleFindAll } from '@type/api/article'
import articleApi from '@api/article'

/**
 * UTILS
 **/
import checkIsTHLocale from '@utils/isTHLocale'

Article.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout bannerTitle="staticNavbar.news-and-event" bannerImg={banners.finance}>
      {page}
    </DefaultLayout>
  )
}

const getStaticProps = makeStaticProps(['title', 'navbar', 'common'])
export { getStaticPaths, getStaticProps }

export default function Article() {
  const titleLng = useTranslation('title')
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [article, setArticle] = useState<ArticleFindAll[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: articleData } = await articleApi.findAll({ page: 1, pageLimit: 100 })
        setArticle(checkIsTHLocale(String(router.query.locale)) ? articleData.TH : articleData.EN)
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
          {titleLng.t('article')} - {TITLE_COMPANY_NAME}
        </title>
      </Head>
      <Loading isOpen={loading} />
      {!loading && (
        <Stack rowGap={{ xs: 5, lg: 8 }} mt={{ xs: 5, lg: 11 }}>
          <Typography variant="h5" component="h1" align="center" color="secondary.main" fontWeight={600}>
            {titleLng.t('article')}
          </Typography>

          <Grid container spacing={3}>
            {article.map(({ id, title, subTitle, filePath, content, viewer }, idx) => (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={idx}>
                <ArticleCard
                  title={title || ''}
                  img={`${BASE_URL}${filePath}`}
                  detail={subTitle || ''}
                  view={viewer}
                  handleClick={() => router.push(`${router.asPath}detail?id=${id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
    </>
  )
}
