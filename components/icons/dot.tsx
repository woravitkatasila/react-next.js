import { IconProps } from '@type/global/icon'

export default function DotIcon({ color = '#01AA8D', width = '8', height = '8' }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  )
}
