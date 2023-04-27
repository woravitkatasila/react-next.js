import { IconProps } from '@type/global/icon'

export default function CloseIcon({ color = '#0B5D99', width = '19', height = '19' }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.5569 9.49815L17.8277 3.2419C18.1023 2.9673 18.2566 2.59484 18.2566 2.20649C18.2566 1.81813 18.1023 1.44568 17.8277 1.17107C17.5531 0.896462 17.1807 0.742187 16.7923 0.742188C16.404 0.742188 16.0315 0.896462 15.7569 1.17107L9.50064 7.44191L3.24439 1.17107C2.96978 0.896462 2.59733 0.742187 2.20898 0.742188C1.82062 0.742188 1.44817 0.896462 1.17356 1.17107C0.89895 1.44568 0.744676 1.81813 0.744676 2.20649C0.744676 2.59484 0.89895 2.9673 1.17356 3.2419L7.44439 9.49815L1.17356 15.7544C1.03687 15.89 0.928381 16.0513 0.854344 16.229C0.780306 16.4067 0.742188 16.5973 0.742188 16.7898C0.742188 16.9823 0.780306 17.173 0.854344 17.3507C0.928381 17.5284 1.03687 17.6897 1.17356 17.8252C1.30913 17.9619 1.47042 18.0704 1.64814 18.1445C1.82585 18.2185 2.01646 18.2566 2.20898 18.2566C2.40149 18.2566 2.59211 18.2185 2.76982 18.1445C2.94753 18.0704 3.10882 17.9619 3.24439 17.8252L9.50064 11.5544L15.7569 17.8252C15.8925 17.9619 16.0538 18.0704 16.2315 18.1445C16.4092 18.2185 16.5998 18.2566 16.7923 18.2566C16.9848 18.2566 17.1754 18.2185 17.3532 18.1445C17.5309 18.0704 17.6922 17.9619 17.8277 17.8252C17.9644 17.6897 18.0729 17.5284 18.1469 17.3507C18.221 17.173 18.2591 16.9823 18.2591 16.7898C18.2591 16.5973 18.221 16.4067 18.1469 16.229C18.0729 16.0513 17.9644 15.89 17.8277 15.7544L11.5569 9.49815Z"
        fill={color}
      />
    </svg>
  )
}