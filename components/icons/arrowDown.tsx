import { IconProps } from '@type/global/icon'

export default function ArrowDownIcon({ color, width = '21', height = '12' }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.7321 14.4881L0.528915 4.61399C-0.176305 3.93151 -0.176305 2.82793 0.528915 2.15271L2.22445 0.511859C2.92967 -0.17062 4.07002 -0.17062 4.76774 0.511859L12 7.51089L19.2323 0.511859C19.9375 -0.17062 21.0778 -0.17062 21.7756 0.511859L23.4711 2.15271C24.1763 2.83519 24.1763 3.93877 23.4711 4.61399L13.2679 14.4881C12.5777 15.1706 11.4373 15.1706 10.7321 14.4881Z"
        fill={color}
      />
    </svg>
  )
}
