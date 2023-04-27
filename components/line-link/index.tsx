import Link from 'next/link'

interface Props {
  lineId: string
  children?: React.ReactNode
}

export default function LineLink({ lineId, children }: Props) {
  return (
    <Link href={`https://line.me/R/ti/p/${lineId}`} passHref>
      <a target="_blank" rel="noopener">
        {children}
      </a>
    </Link>
  )
}
