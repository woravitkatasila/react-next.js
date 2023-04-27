import Link from 'next/link'
import { BASE_URL } from '@constants/config'

interface Props {
  link: string
  baseUrl?: string
  children?: React.ReactNode
  key?: string | number
}

export default function DownloadLink({ link, children, baseUrl, key }: Props) {
  return (
    <Link href={`${baseUrl !== undefined && baseUrl !== null ? baseUrl : BASE_URL}${link}`} download key={key}>
      <a target="_blank" rel="noopener">
        {children}
      </a>
    </Link>
  )
}
