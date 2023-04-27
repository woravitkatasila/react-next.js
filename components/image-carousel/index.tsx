import Image from '@components/Image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { useRouter } from 'next/router'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper'
import { BASE_URL } from '@constants/config'
import { Box } from '@mui/material'

interface Props {
  banners: Array<{
    image: string
    imageMobile: string
    link: string
  }>
  time: number
}

export default function ImageCarousel({ banners, time }: Props) {
  const router = useRouter()
  const pagination = {
    clickable: true,
    renderBullet: function (_index: number, className: string) {
      return '<span class="' + className + '"></span>'
    }
  }

  return (
    <Swiper
      pagination={pagination}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: time,
        disableOnInteraction: false
      }}
      className="my-swiper"
    >
      {banners.map(({ image, imageMobile, link }, idx) => (
        <SwiperSlide key={idx} onClick={() => router.push(link)}>
          <Box display={{ xs: 'none', sm: 'flex' }}>
            <Image src={`${BASE_URL}${image}`} alt={image} layout="fill" priority />
          </Box>
          <Box display={{ xs: 'flex', sm: 'none' }}>
            <Image src={`${BASE_URL}${imageMobile ? imageMobile : image}`} alt={image} layout="fill" priority />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
