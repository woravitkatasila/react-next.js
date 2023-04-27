import { useState, FormEvent, useRef, useEffect } from 'react'
import { AxiosError } from 'axios'
import { useTranslation } from 'next-i18next'
import useCaptcha from 'use-offline-captcha'

/**
 * MUI
 **/
import { Typography, TextField, Button, Stack, Checkbox, CircularProgress, IconButton } from '@mui/material'

/**
 * COMPONENTS
 **/
import PhoneIcon from '@components/icons/phone'
import MailIcon from '@components/icons/mail'
import PersonIcon from '@components/icons/person'
import ImageEditIcon from '@components/icons/imageEdit'
import TextPolicy from '@components/text-policy'
import AlertCustom from '@components/alert'
import RefreshIcon from '@components/icons/refresh'

/**
 * API
 **/
import contactApi from '@api/contact'

import type { Contact } from '@type/global/contact'

interface Props {
  title: string
  type: Contact
}

export default function ContactForm({ title, type }: Props) {
  const commonLng = useTranslation('common')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    isOpen: false,
    text: '',
    severity: 'success' as 'success' | 'error'
  })
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [checked, setChecked] = useState(false)

  const [captcha, setCaptcha] = useState('')

  const captchaRef = useRef<HTMLInputElement>(null)
  const userOpt = {
    type: 'mixed', // "mixed"(default) | "numeric" | "alpha"
    length: 4, // 4 to 8 number. default is 5
    sensitive: true, // Case sensitivity. default is false
    width: 200, // Canvas width. default is 200
    height: 60, // Canvas height. default is 50
    fontColor: '#000',
    background: 'rgba(255, 255, 255, .2)'
  }
  const { gen, validate } = useCaptcha(captchaRef as any, userOpt as any)

  useEffect(() => {
    if (gen) gen()
  }, [gen])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate(captcha)) {
      gen()
      setCaptcha('')
      setAlert({
        isOpen: true,
        text: 'captchaInvalid',
        severity: 'error'
      })
      return
    }
    setLoading(true)

    let payload = {
      name: fullname,
      email,
      phone,
      content: message,
      type: type
    }

    try {
      await contactApi.create(payload)
      setFullname('')
      setEmail('')
      setPhone('')
      setMessage('')
      setChecked(false)
      setCaptcha('')

      setAlert({
        isOpen: true,
        text: 'successSent',
        severity: 'success'
      })
    } catch (err) {
      const errors = err as Error | AxiosError<any>
      console.log(errors)
      setAlert({
        isOpen: true,
        text: 'errorSent',
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AlertCustom
        isOpen={alert.isOpen}
        text={alert.text}
        severity={alert.severity}
        onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
      />
      <Stack direction="column" rowGap={3} sx={contactForm}>
        <Typography variant="body1" align="center" color="secondary.main">
          {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" rowGap={3}>
            <Stack direction="column" rowGap={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PersonIcon />
                <Typography variant="body1" color="secondary.main">
                  {commonLng.t('fullName')}
                </Typography>
              </Stack>
              <TextField
                variant="outlined"
                placeholder={commonLng.t('fullName')}
                sx={textFieldStyle}
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
              />
            </Stack>

            <Stack direction="column" rowGap={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <MailIcon />
                <Typography variant="body1" color="secondary.main">
                  {commonLng.t('email')}
                </Typography>
              </Stack>
              <TextField
                type="email"
                variant="outlined"
                placeholder={commonLng.t('email')}
                sx={textFieldStyle}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Stack>

            <Stack direction="column" rowGap={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneIcon />
                <Typography variant="body1" color="secondary.main">
                  {commonLng.t('tel')}
                </Typography>
              </Stack>
              <TextField
                variant="outlined"
                placeholder={commonLng.t('tel')}
                sx={textFieldStyle}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                value={phone}
                inputProps={{
                  maxLength: 10
                }}
              />
            </Stack>

            <Stack direction="column" rowGap={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <ImageEditIcon />
                <Typography variant="body1" color="secondary.main">
                  {commonLng.t('message')}
                </Typography>
              </Stack>
              <TextField
                variant="outlined"
                placeholder={commonLng.t('writeMessage')}
                sx={[textFieldStyle, { '& .MuiOutlinedInput-root': { p: 0 } }]}
                multiline
                rows={4}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </Stack>

            <Stack direction="row" alignItems="flex-start">
              <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
              <TextPolicy />
            </Stack>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="center"
              alignItems={{ xs: 'flex-start', md: 'center' }}
              flexWrap="wrap"
              columnGap={3}
              rowGap={2}
              display={checked ? 'flex' : 'none'}
            >
              <Stack direction="row" justifyContent="center" alignItems="center">
                <div ref={captchaRef} style={{ display: 'flex', alignItems: 'center' }} />
                <IconButton size="small" onClick={() => gen()}>
                  <RefreshIcon />
                </IconButton>
              </Stack>
              <TextField
                placeholder="Verification code"
                variant="outlined"
                sx={{ width: 242 }}
                size="small"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                autoComplete="off"
              />
            </Stack>

            <Stack direction="row" justifyContent="center" mt={5}>
              <Button
                type="submit"
                variant="contained"
                sx={buttonStyle}
                color="primary"
                disabled={!fullname || !email || !phone || !checked}
              >
                {loading ? <CircularProgress color="inherit" size={20} /> : commonLng.t('sentData')}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </>
  )
}

const contactForm = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  py: 5,
  px: { xs: 2, sm: 5, md: 10 }
}

const textFieldStyle = {
  '& .MuiOutlinedInput-input': {
    p: 1.5,
    fontSize: 14,
    backgroundColor: 'white',
    width: '100%'
  }
}

const buttonStyle = {
  color: 'white',
  p: '5px 40px',
  fontSize: '1rem',
  height: '39px'
}
