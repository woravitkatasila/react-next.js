import { IconProps } from '@type/global/icon'

export default function FacebookLogoIcon({ color, width = '25', height = '25' }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.5" cy="12.5" r="12.5" fill="white" />
      <g clipPath="url(#clip0_608_24958)">
        <path
          d="M10.8478 19.9507V12.6696H8.86719V10.048H10.8478V7.80889C10.8478 6.04934 12.0177 4.4335 14.7135 4.4335C15.805 4.4335 16.6121 4.53522 16.6121 4.53522L16.5485 6.98331C16.5485 6.98331 15.7254 6.97552 14.8272 6.97552C13.855 6.97552 13.6993 7.41101 13.6993 8.13382V10.048H16.6258L16.4985 12.6696H13.6993V19.9507H10.8478Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_608_24958">
          <rect width="7.75862" height="15.5172" fill="white" transform="translate(8.86719 4.4335)" />
        </clipPath>
      </defs>
    </svg>
  )
}
