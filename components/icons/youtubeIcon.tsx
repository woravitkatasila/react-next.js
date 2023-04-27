import { IconProps } from '@type/global/icon'

export default function YoutubeIcon({ color = '#EE3741', width = '23', height = '23' }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.5 0C5.14718 0 0 5.14718 0 11.5C0 17.8528 5.14718 23 11.5 23C17.8528 23 23 17.8528 23 11.5C23 5.14718 17.8528 0 11.5 0ZM16.8651 12.6129L8.70383 17.2964C7.97117 17.7044 7.04839 17.1804 7.04839 16.3226V6.67742C7.04839 5.82419 7.96653 5.29556 8.70383 5.70363L16.8651 10.6653C17.6256 11.0919 17.6256 12.1909 16.8651 12.6129Z"
        fill={color}
      />
    </svg>
  )
}
