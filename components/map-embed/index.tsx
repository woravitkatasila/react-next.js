import { Box } from '@mui/material'

interface Props {
  iframe: string
  width?: string
  height?: string
  style?: any
}

export default function MapEmbed({ iframe, width = '100%', height = '100%', style }: Props) {
  let str2 = ''
  try {
    let arr = iframe.split(' ')
    let str1 = arr[1].replace('src=', '')
    str2 = str1.replaceAll('"', '')
  } catch (err) {
    str2 = ''
    console.log(err)
  }

  return str2 ? (
    <iframe src={str2} width={width} height={height} style={style} loading="lazy"></iframe>
  ) : (
    <Box>ไม่พบแผนที่</Box>
  )
  // <iframe
  //   width={width}
  //   height={height}
  //   style={style}
  //   loading="lazy"
  //   src={`https://www.google.com/maps/embed/v1/place?key=&q=16.38475,102.821944`}
  // ></iframe>
}
