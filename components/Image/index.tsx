import NextImage, { ImageProps } from 'next/image'
const customLoader = ({ src }: any) => {
  return src
}

export default function Image(props: ImageProps) {
  return <NextImage {...props} loader={customLoader} />
}
