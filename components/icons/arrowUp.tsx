import { IconProps } from '@type/global/icon'

export default function ArrowUpIcon({ color, width = '21', height = '12' }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.39059 0.409487L0.462801 8.30881C-0.154267 8.85479 -0.154267 9.73766 0.462801 10.2778L1.94639 11.5905C2.56346 12.1365 3.56127 12.1365 4.17177 11.5905L10.5 5.99129L16.8282 11.5905C17.4453 12.1365 18.4431 12.1365 19.0536 11.5905L20.5372 10.2778C21.1543 9.73185 21.1543 8.84898 20.5372 8.30881L11.6094 0.409487C11.0055 -0.136496 10.0077 -0.136496 9.39059 0.409487Z"
        fill={color}
      />
    </svg>
  )
}
