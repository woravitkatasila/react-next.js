import { useState, FormEvent, useEffect, Fragment, useRef } from 'react'
import { AxiosError } from 'axios'
import { useTranslation } from 'next-i18next'
import useCaptcha from 'use-offline-captcha'

/**
 * MUI
 **/
import {
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Box,
  CircularProgress,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  IconButton
} from '@mui/material'

/**
 * COMPONENTS
 **/
import RightArrowIcon from '@components/icons/rightArrow'
import ContentCard from '@components/cards/content'
import AlertCustom from '@components/alert'
import TextPolicy from '@components/text-policy'
import LoanSelectedCard from '@components/cards/loanSelected'
import TextUnderline from '@components/text-underline'
import PersonIcon from '@components/icons/person'
import ListIcon from '@components/icons/list'
import AccordionCustom from '@components/accordion-custom'
import RefreshIcon from '@components/icons/refresh'

import type { CarType } from '@type/api/loan-types'

/**
 * CONSTANTS
 **/
import { LOAN_OFFER } from '@constants/informations'
/**
 * API
 **/
import loanApi from '@api/loan'

interface Props {
  loanTypeId: number
  carTypes: CarType[]
}
export default function LoanForm({ loanTypeId, carTypes }: Props) {
  const commonLng = useTranslation('common')
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const [carTypeIdx, setCarTypeIdx] = useState<number>(0)
  const [alert, setAlert] = useState({
    isOpen: false,
    text: '',
    severity: 'success' as 'success' | 'error'
  })
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
        setCarTypeIdx(0)
      } else {
        setCarTypeIdx(-1)
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
      loanTypeId: loanTypeId,
      carTypeId:
        carTypes.length !== 0 ? (carTypeIdx ? carTypes[Number(carTypeIdx)].carTypeId : carTypes[0].carTypeId) : null,
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
      {carTypes.length !== 0 && (
        <Stack direction="column" rowGap={2} display={{ xs: 'none', md: 'flex' }}>
          <Typography variant="body2" component="span" color="body.contrastText" fontWeight={500}>
            {commonLng.t('chooseCar')}
            <Typography variant="body2" component="span" color="error.main" ml={0.3}>
              *
            </Typography>
          </Typography>

          <Grid container rowGap={2}>
            {carTypes.map(({ carTypeName, icon }, idx) => (
              <Grid item xs={2} key={carTypeName} px={1}>
                <LoanSelectedCard
                  name={carTypeName || ''}
                  icon={icon}
                  active={carTypeIdx === idx}
                  key={String(carTypeName)}
                  handleClick={() => {
                    setCarTypeIdx(idx)
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Stack sx={carDetail} mt={{ sx: 0, md: 3 }}>
            <Stack direction="row">
              <TextUnderline
                bgColor="error.main"
                variant="body1"
                component="div"
                color="secondary.main"
                text={`${commonLng.t('detailOf')} ${carTypes[carTypeIdx === -1 ? 0 : carTypeIdx].carTypeName}`}
                height="3px"
              />
            </Stack>
            <Typography variant="content" component="div" color="body.main">
              {carTypes[carTypeIdx === -1 ? 0 : carTypeIdx].content}
            </Typography>
          </Stack>
        </Stack>
      )}

      <ContentCard>
        <Stack direction="column" spacing={5} px={{ xs: 3, md: 10 }} py={5}>
          <Typography variant="h5" component="h2" align="center" color="secondary.main" fontWeight={600}>
            {commonLng.t('applyingLone')}
          </Typography>

          <Stack
            direction="row"
            display={{ xs: 'none', md: 'flex' }}
            justifyContent="center"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={{ xs: 2, md: 4 }}
          >
            {LOAN_OFFER.map((item) => (
              <Stack direction="row" alignItems="center" spacing={{ xs: 1, md: 2 }} key={item}>
                <Box display={{ xs: 'block', sm: 'none' }}>
                  <RightArrowIcon width="25" height="25" />
                </Box>
                <Box display={{ xs: 'none', sm: 'block' }}>
                  <RightArrowIcon />
                </Box>
                <Typography variant="body1" component="h4" align="center" color="body.main" fontWeight={500}>
                  {commonLng.t(item)}
                </Typography>
              </Stack>
            ))}
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={7}>
              <Grid container spacing={2}>
                {carTypes.length !== 0 && (
                  <Grid item xs={12} md={4} flexDirection="column" display={{ xs: 'flex', md: 'none' }}>
                    <Typography variant="subtitle2" component="div" color="body.contrastText" mb={1}>
                      {commonLng.t('chooseCar')}
                      <Typography component="span" color="error.main">
                        *
                      </Typography>
                    </Typography>
                    <FormControl size="small" sx={{ display: { xs: 'flex', md: 'none' } }}>
                      <Select
                        renderValue={(value) =>
                          value !== -1 ? (
                            carTypes[Number(value)].carTypeName
                          ) : (
                            <Typography variant="caption" component="span" color="body.light" fontSize={16}>
                              {commonLng.t('selectCar')}
                            </Typography>
                          )
                        }
                        value={Number(carTypeIdx)}
                        onChange={(e) => setCarTypeIdx(Number(e.target.value))}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        color="secondary"
                        sx={[
                          carTypeIdx !== -1 && selectCustom,
                          { '& .MuiSelect-select': { whiteSpace: 'pre-wrap !important' } }
                        ]}
                      >
                        {carTypes.map(({ carTypeName }, idx) => (
                          <MenuItem key={carTypeName} value={idx}>
                            {carTypeName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {carTypeIdx !== -1 && (
                      <Stack sx={carDetail} mt={{ sx: 0, md: 3 }} mb={3}>
                        <Typography variant="content" component="div" color="body.main">
                          {carTypes[Number(carTypeIdx)].content}
                        </Typography>
                      </Stack>
                    )}
                  </Grid>
                )}

                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" component="div" color="body.contrastText" mb={1}>
                    {commonLng.t('firstName')}
                    <Typography component="span" color="error.main">
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
                  <Typography variant="subtitle2" component="div" color="body.contrastText" mb={1}>
                    {commonLng.t('lastName')}
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder={commonLng.t('fillinLastName')}
                    size="small"
                    value={loan.lastName}
                    onChange={(e) => setLoan((prev) => ({ ...prev, lastName: e.target.value }))}
                    inputProps={{
                      maxLength: 255
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" component="div" color="body.contrastText" mb={1}>
                    {commonLng.t('tel')}
                    <Typography component="span" color="error.main">
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
                display={
                  loan.firstName &&
                  loan.lastName &&
                  loan.phone &&
                  (carTypeIdx !== -1 || carTypes.length === 0) &&
                  checked
                    ? 'flex'
                    : 'none'
                }
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
                    (carTypeIdx === -1 && carTypes.length !== 0) ||
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
      </ContentCard>

      {carTypes.length !== 0 &&
        ((carTypeIdx !== -1 && carTypes[Number(carTypeIdx)].property.data?.length !== 0) ||
          (carTypeIdx !== -1 && carTypes[Number(carTypeIdx)].document.data?.length !== 0)) && (
          <Stack direction="column" spacing={3}>
            <Typography variant="h5" component="p" align="center" color="secondary.main" fontWeight={600}>
              {commonLng.t('qualificationOfApplicant')}
            </Typography>
            <Stack direction="column" spacing={1}>
              <AccordionCustom
                title={
                  <Stack direction="row" alignItems="center" columnGap={2}>
                    <PersonIcon color="#01AA8D" /> {commonLng.t('qualificationsOfTheLoanApplicant')}
                  </Stack>
                }
              >
                <Stack direction="column" rowGap={4}>
                  {carTypes[Number(carTypeIdx)].property.data?.map(({ title, data }) => (
                    <Fragment key={title}>
                      <Stack direction="row">
                        <TextUnderline
                          bgColor="error.main"
                          variant="body1"
                          component="div"
                          color="body.main"
                          text={title}
                          height="3px"
                          width="100%"
                          bottom={-5}
                          align="left"
                        />
                      </Stack>
                      <Stack direction="column" rowGap={2}>
                        {data.map(
                          ({ content }) =>
                            content && (
                              <Typography variant="content" component="p" key={`personal-item-${content}`}>
                                • {content}
                              </Typography>
                            )
                        )}
                      </Stack>
                    </Fragment>
                  ))}
                </Stack>
              </AccordionCustom>
              <AccordionCustom
                title={
                  <Stack direction="row" alignItems="center" columnGap={2}>
                    <ListIcon color="#01AA8D" /> {commonLng.t('applicationDocuments')}
                  </Stack>
                }
              >
                <Stack direction="column" rowGap={4}>
                  {carTypes[Number(carTypeIdx)].document.data?.map(({ title, data }) => (
                    <Fragment key={title}>
                      <Stack direction="row">
                        <TextUnderline
                          bgColor="error.main"
                          variant="body1"
                          component="div"
                          color="body.main"
                          text={title}
                          height="3px"
                          width="100%"
                          bottom={-5}
                          align="left"
                        />
                      </Stack>
                      <Stack direction="column" rowGap={2}>
                        {data.map(
                          ({ content }) =>
                            content && (
                              <Typography variant="content" component="p" key={`doc-item-${content}`}>
                                • {content}
                              </Typography>
                            )
                        )}
                      </Stack>
                    </Fragment>
                  ))}
                </Stack>
              </AccordionCustom>
            </Stack>
          </Stack>
        )}
    </>
  )
}

const carDetail = {
  backgroundColor: 'white',
  p: { xs: 2, md: 4 },
  border: '1px solid',
  borderColor: 'primary.main',
  borderRadius: 2,
  borderTopLeftRadius: { xs: 0, md: 8 },
  borderTopRightRadius: { xs: 0, md: 8 },
  rowGap: 5,
  minHeight: '300px'
}

const buttonStyle = {
  color: 'white',
  p: '5px 30px',
  fontSize: '1rem',
  height: '39px'
}

const selectCustom = {
  fontSize: 14,
  backgroundColor: 'secondary.main',
  color: 'white',
  '& .MuiSvgIcon-root': {
    color: 'white'
  }
}
