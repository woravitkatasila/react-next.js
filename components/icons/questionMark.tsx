import { IconProps } from '@type/global/icon'

export default function QuestionMarkIcon({ color = '#0B5D99', width = '23', height = '23' }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.5 21.5625C8.83126 21.5625 6.27182 20.5023 4.38474 18.6153C2.49765 16.7282 1.4375 14.1687 1.4375 11.5C1.4375 8.83126 2.49765 6.27182 4.38474 4.38474C6.27182 2.49765 8.83126 1.4375 11.5 1.4375C14.1687 1.4375 16.7282 2.49765 18.6153 4.38474C20.5023 6.27182 21.5625 8.83126 21.5625 11.5C21.5625 14.1687 20.5023 16.7282 18.6153 18.6153C16.7282 20.5023 14.1687 21.5625 11.5 21.5625ZM11.5 23C14.55 23 17.4751 21.7884 19.6317 19.6317C21.7884 17.4751 23 14.55 23 11.5C23 8.45001 21.7884 5.52494 19.6317 3.36827C17.4751 1.2116 14.55 0 11.5 0C8.45001 0 5.52494 1.2116 3.36827 3.36827C1.2116 5.52494 0 8.45001 0 11.5C0 14.55 1.2116 17.4751 3.36827 19.6317C5.52494 21.7884 8.45001 23 11.5 23Z"
        fill={color}
      />
      <path
        d="M7.55499 8.31737C7.55303 8.3638 7.56057 8.41013 7.57718 8.45353C7.59378 8.49693 7.61908 8.53647 7.65153 8.56973C7.68398 8.60298 7.72289 8.62925 7.76586 8.64691C7.80884 8.66458 7.85497 8.67326 7.90143 8.67244H9.08737C9.28574 8.67244 9.44387 8.51 9.46974 8.31306C9.59912 7.37006 10.246 6.68294 11.3989 6.68294C12.385 6.68294 13.2877 7.176 13.2877 8.36194C13.2877 9.27475 12.7501 9.6945 11.9006 10.3328C10.9331 11.0357 10.1669 11.8565 10.2216 13.1891L10.2259 13.501C10.2274 13.5953 10.2659 13.6853 10.3331 13.7514C10.4004 13.8176 10.4909 13.8546 10.5852 13.8546H11.7511C11.8464 13.8546 11.9378 13.8168 12.0052 13.7494C12.0726 13.682 12.1104 13.5906 12.1104 13.4952V13.3443C12.1104 12.3122 12.5029 12.0117 13.5623 11.2082C14.4377 10.5426 15.3506 9.80375 15.3506 8.25269C15.3506 6.08063 13.5163 5.03125 11.5081 5.03125C9.68681 5.03125 7.69156 5.87937 7.55499 8.31737ZM9.79318 16.6017C9.79318 17.3679 10.4041 17.9342 11.2451 17.9342C12.1205 17.9342 12.7228 17.3679 12.7228 16.6017C12.7228 15.8082 12.1191 15.2504 11.2436 15.2504C10.4041 15.2504 9.79318 15.8082 9.79318 16.6017Z"
        fill={color}
      />
    </svg>
  )
}