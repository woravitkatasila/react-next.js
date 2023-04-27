/**
 * MUI
 **/
import { Typography } from '@mui/material'

interface Props {
  img: string
  title?: string
}

export default function ImageBanner({ img, title }: Props) {
  return (
    <>
      {title ? (
        <div
          style={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            padding: '12px'
          }}
          className="img-banner"
        >
          <Typography variant="h4" component="h1" color="white" fontWeight={500}>
            {title}
          </Typography>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <img
            src={img}
            className="img-banner"
            style={{
              width: '100%'
            }}
          />
        </div>
      )}
    </>
  )
}
