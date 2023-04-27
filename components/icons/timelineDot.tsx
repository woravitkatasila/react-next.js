import { IconProps } from '@type/global/icon'

export default function TimelineDotIcon({ color = '#0B5D99', width = '30', height = '30' }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="12.75" stroke="#0B5D99" />
      <circle cx="15" cy="15" r="10" fill={color} />
    </svg>
  )
}
