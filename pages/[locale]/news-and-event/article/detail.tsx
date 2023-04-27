import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getStaticPaths, makeStaticProps } from '@lib/getStatic'

/**
 * MUI
 **/
import { Stack, Typography } from '@mui/material'
/**
 * COMPONENTS
 **/
import DefaultLayout from '@components/layouts/default'
import Loading from '@components/loading'
import DisplayContent from '@components/display-content'

/**
 * CONSTANTS
 **/
import { BASE_URL } from '@constants/config'
import { TITLE_COMPANY_NAME } from '@constants/config'
/**
 * API
 **/
import articleApi from '@api/article'
import type { FindOneData } from '@type/api/article'
/**
 * UTILS
 **/
import checkIsTHLocale from '@utils/isTHLocale'

EventNewsDetail.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

const getStaticProps = makeStaticProps(['title', 'navbar', 'common'])
export { getStaticPaths, getStaticProps }

export default function EventNewsDetail() {
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState<boolean>(true)
  const [article, setArticle] = useState<FindOneData>({
    id: null,
    filePath: '',
    banner: '',
    title: '',
    content: '',
    viewer: 0
  })

  useEffect(() => {
    const addView = async () => {
      try {
        await articleApi.addView(Number(id))
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    addView()
  }, [router.query, router.isReady])
  useEffect(() => {
    const findOne = async () => {
      try {
        const { data } = await articleApi.findOne(Number(id))
        checkIsTHLocale(String(router.query.locale)) ? setArticle(data.TH) : setArticle(data.EN)
      } catch (err) {
        console.log(err)
      }
    }
    if (router.isReady) findOne()
  }, [router.query, router.isReady])

  return (
    <>
      <Head>
        <title>
          {article.title} - {TITLE_COMPANY_NAME}
        </title>
      </Head>
      <DefaultLayout bannerImg={`${BASE_URL}${article.banner}`}>
        <Loading isOpen={loading} />
        {!loading && (
          <Stack rowGap={{ xs: 5, lg: 8 }} mt={{ xs: 5, lg: 11 }}>
            <Typography variant="h5" component="h1" align="center" color="secondary.main" fontWeight={600}>
              {article.title}
            </Typography>

            <DisplayContent html={String(article.content)} />
          </Stack>
        )}
      </DefaultLayout>
    </>
  )
}
