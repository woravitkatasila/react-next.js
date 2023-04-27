import { useState, FormEvent, Fragment, useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import { AxiosError } from 'axios'
import useCaptcha from 'use-offline-captcha'
/**
 * MUI
 **/
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Stack,
  Grid,
  Checkbox,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  IconButton
} from '@mui/material'

/**
 * COMPONENTS
 **/
import TextUnderline from '@components/text-underline'
import TextPolicy from '@components/text-policy'
import AlertCustom from '@components/alert'
import RefreshIcon from '@components/icons/refresh'

/**
 * API
 **/
import type { FindAll as LoanTypesFindAll } from '@type/api/loan-types'
import type { FindAll as carTypesFineAll } from '@type/api/car-types'
import loanApi from '@api/loan'

interface Props {
  loanTypes: LoanTypesFindAll[]
  carTypes: carTypesFineAll[]
}

export default function HomeForm({ loanTypes, carTypes }: Props) {
  const commonLng = useTranslation('common')
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    isOpen: false,
    text: '',
    severity: 'success' as 'success' | 'error'
  })
  const [loanTypeId, setLoanTypeId] = useState<number | string>('')
  const [carTypeId, setCarTypeId] = useState<number | string>('')
  const [loan, setLoan] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  })
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

  useEffect(() => {
    if (alert.severity === 'success') {
      if (window.innerWidth > 900) {
        // setLoanTypeId(loanTypes[0].loanTypeId)
        // setCarTypeId(carTypes[0].carTypeId)
      } else {
        setLoanTypeId('')
        setCarTypeId('')
      }
    }
  }, [alert])

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
      loanTypeId: loanTypeId ? Number(loanTypeId) : loanTypes[0].loanTypeId,
      carTypeId: carTypeId ? Number(carTypeId) : carTypes[0].carTypeId,
      firstName: loan.firstName,
      lastName: loan.lastName,
      phone: loan.phone
    }

    try {
      await loanApi.create(payload)
      setLoan({
        firstName: '',
        lastName: '',
        phone: ''
      })
      setCaptcha('')
      setChecked(false)
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
      gen()
    }
  }

  return (
    <Box sx={boxForm}>
      <AlertCustom
        isOpen={alert.isOpen}
        text={alert.text}
        severity={alert.severity}
        onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
      />
      <Stack direction="row" justifyContent="center" display={{ xs: 'flex', lg: 'none' }}>
        <Typography variant="body1" component="h1" align="center" color="secondary.main" fontWeight={500}>
          {commonLng.t('applyingLone')}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={3} display={{ xs: 'none', md: 'flex' }}>
        <Stack direction="column" display={{ xs: 'none', lg: 'flex' }}>
          <TextUnderline
            bgColor="primary.main"
            variant="h5"
            component="h1"
            color="secondary.main"
            text={commonLng.t('applyingLone')}
            height="3px"
            width="100%"
            style={{ fontWeight: 500, minWidth: '170px' }}
          />
        </Stack>

        <Stack direction="column" spacing={6}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Typography variant="subtitle1" component="span" color="secondary.main" sx={{ minWidth: '110px' }}>
              {commonLng.t('loanType')}
            </Typography>
            <RadioGroup row defaultValue={loanTypes[0].loanTypeId} sx={{ columnGap: 0.1, rowGap: 2 }}>
              {loanTypes.map((item) => (
                <FormControlLabel
                  key={item.loanTypeId}
                  value={item.loanTypeId}
                  control={
                    <Radio sx={{ p: 0.5 }} size="small" onChange={(e) => setLoanTypeId(Number(e.target.value))} />
                  }
                  label={item.loanTypeName}
                  sx={formControlLabelStyle}
                />
              ))}
            </RadioGroup>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Typography variant="subtitle1" component="span" color="secondary.main" sx={{ minWidth: '110px' }}>
              {commonLng.t('carType')}
            </Typography>
            <RadioGroup row defaultValue={carTypes[0].carTypeId} sx={{ columnGap: 0.1, rowGap: 2 }}>
              {carTypes.map((item) => (
                <FormControlLabel
                  key={item.carTypeId}
                  value={item.carTypeId}
                  control={
                    <Radio sx={{ p: 0.5 }} size="small" onChange={(e) => setCarTypeId(Number(e.target.value))} />
                  }
                  label={item.carTypeName}
                  sx={formControlLabelStyle}
                />
              ))}
            </RadioGroup>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center" display={{ xs: 'none', md: 'flex' }}>
          <Typography variant="h5" component="h2" color="error.main">
            {commonLng.t('highCreditLimitFastApproval')}
          </Typography>
          <Typography variant="subtitle1" component="span" color="secondary.main">
            {commonLng.t('pleaseFillOut')}
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} display={{ xs: 'block', md: 'none' }}>
                <Typography variant="caption" component="div" color="body.main" fontWeight={500} mb={1}>
                  {commonLng.t('loanType')}
                  <Typography variant="caption" component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <FormControl size="small" fullWidth>
                  <Select
                    renderValue={(value) =>
                      value ? (
                        loanTypes[loanTypes.findIndex((item) => item.loanTypeId === value)].loanTypeName
                      ) : (
                        <Typography variant="caption" component="span" color="body.light" fontSize={16}>
                          {commonLng.t('selectLoan')}
                        </Typography>
                      )
                    }
                    value={loanTypeId}
                    onChange={(e) => setLoanTypeId(Number(e.target.value))}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ '& .MuiSelect-select': { whiteSpace: 'pre-wrap !important' } }}
                  >
                    {loanTypes.map((item) => (
                      <MenuItem key={item.loanTypeId} value={item.loanTypeId}>
                        {item.loanTypeName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} display={{ xs: 'block', md: 'none' }}>
                <Typography variant="caption" component="div" color="body.main" fontWeight={500} mb={1}>
                  {commonLng.t('carType')}
                  <Typography variant="caption" component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <FormControl size="small" fullWidth>
                  <Select
                    renderValue={(value) =>
                      value ? (
                        carTypes[carTypes.findIndex((item) => item.carTypeId === value)].carTypeName
                      ) : (
                        <Typography variant="caption" component="span" color="body.light" fontSize={16}>
                          {commonLng.t('selectCar')}
                        </Typography>
                      )
                    }
                    value={carTypeId}
                    onChange={(e) => setCarTypeId(Number(e.target.value))}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ '& .MuiSelect-select': { whiteSpace: 'pre-wrap !important' } }}
                  >
                    {carTypes.map((item) => (
                      <MenuItem key={item.carTypeId} value={item.carTypeId}>
                        {item.carTypeName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography
                  variant="caption"
                  component="div"
                  color="body.main"
                  fontWeight={500}
                  mb={1}
                  display={{ xs: 'flex', md: 'none' }}
                >
                  {commonLng.t('firstName')}
                  <Typography variant="caption" component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={commonLng.t('fillinFirstName')}
                  fullWidth
                  size="small"
                  value={loan.firstName}
                  onChange={(e) => setLoan((prev) => ({ ...prev, firstName: e.target.value }))}
                  inputProps={{
                    maxLength: 255
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography
                  variant="caption"
                  component="div"
                  color="body.main"
                  fontWeight={500}
                  mb={1}
                  display={{ xs: 'flex', md: 'none' }}
                >
                  {commonLng.t('lastName')}
                  <Typography variant="caption" component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={commonLng.t('fillinLastName')}
                  fullWidth
                  size="small"
                  value={loan.lastName}
                  onChange={(e) => setLoan((prev) => ({ ...prev, lastName: e.target.value }))}
                  inputProps={{
                    maxLength: 255
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography
                  variant="caption"
                  component="div"
                  color="body.main"
                  fontWeight={500}
                  mb={1}
                  display={{ xs: 'flex', md: 'none' }}
                >
                  {commonLng.t('tel')}
                  <Typography variant="caption" component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <TextField
                  placeholder={commonLng.t('tel')}
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={loan.phone}
                  onChange={(e) => setLoan((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                  inputProps={{
                    maxLength: 10
                  }}
                />
              </Grid>
            </Grid>
            {(loan.firstName || loan.lastName || loan.phone) && (
              <Fragment>
                <Stack direction="row" alignItems="flex-start">
                  <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                  <TextPolicy />
                </Stack>
                {/* <Stack direction="row" justifyContent="center">
                  <Box sx={boxRobot}>
                    <FormControlLabel
                      sx={{ '& .MuiCheckbox-root': { color: 'secondary.main' } }}
                      control={
                        <Checkbox
                          color="secondary"
                          checked={robotChecked}
                          onChange={(e) => setRobotChecked(e.target.checked)}
                        />
                      }
                      label={
                        <Typography variant="caption" component="span" color="secondary.main">
                          I’m not a robot
                        </Typography>
                      }
                    />
                  </Box>
                </Stack> */}
              </Fragment>
            )}

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="center"
              alignItems={{ xs: 'flex-start', md: 'center' }}
              flexWrap="wrap"
              columnGap={3}
              rowGap={2}
              display={loan.firstName && loan.lastName && loan.phone && checked ? 'flex' : 'none'}
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

            <Stack direction="row" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                sx={buttonStyle}
                color="secondary"
                disabled={
                  !loan.firstName ||
                  !loan.lastName ||
                  !loan.phone ||
                  (!loanTypeId && window.innerWidth < 900) ||
                  (!carTypeId && window.innerWidth < 900) ||
                  !checked ||
                  !captcha
                }
              >
                {loading ? <CircularProgress color="inherit" size={20} /> : commonLng.t('sentData')}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Box>
  )
}

const boxForm = {
  backgroundColor: 'white',
  borderRadius: '15px',
  p: { xs: 2, sm: 4 },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flexWrap: 'wrap',
  rowGap: { xs: 2, md: 4, lg: 6 },
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.08)'
}

const formControlLabelStyle = {
  minWidth: '250px',
  '& .MuiFormControlLabel-label': {
    fontSize: '1rem'
  }
}

// const boxRobot = {
//   border: '1px solid',
//   borderColor: '#DADADA',
//   borderRadius: 1.2,
//   p: 1,
//   pr: 5
// }

const buttonStyle = {
  color: 'white',
  p: '5px 30px',
  fontSize: '1rem',
  height: '39px'
}
