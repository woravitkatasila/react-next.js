import { useState, FormEvent, ChangeEvent } from 'react'
import { useTranslation } from 'next-i18next'

/**
 * MUI
 **/
import { Typography, Stack, Grid, TextField, FormControl, Select, MenuItem, Button, Box } from '@mui/material'

/**
 * COMPONENTS
 **/
import TextUnderline from '@components/text-underline'
import DialogBase from '@components/dialog/base'

import { numberOfMonths } from '@constants/loan'

export default function MonthlyPayment() {
  const commonLng = useTranslation('common')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [carPrice, setCarPrice] = useState('')
  const [downPaymentPercent, setDownPaymentPercent] = useState('')
  const [interest, setInterest] = useState('')
  const [downPayment, setDownPayment] = useState('')
  const [permonth, setPermonth] = useState('')
  const [subtotal, setSubtotal] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedMonth || !carPrice || !downPaymentPercent || !interest) {
      setDownPayment('')
      setSubtotal('')
      setPermonth('')
      return
    }

    let down = (Number(carPrice.replaceAll(',', '')) * Number(downPaymentPercent)) / 100

    let subtotal1 = Number(carPrice.replaceAll(',', '')) - down
    let permonth1 =
      (subtotal1 * (Number(interest) / 100) * (Number(selectedMonth) / 12) + subtotal1) / Number(selectedMonth)

    setDownPayment(String(down.toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ','))
    setSubtotal(String(subtotal1.toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ','))
    setPermonth(String(permonth1.toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ','))

    if (window.innerWidth < 900) setOpen(true)
  }

  const formatCarPrice = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    setCarPrice(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
  }

  const clearForm = () => {
    setSelectedMonth('')
    setCarPrice('')
    setDownPaymentPercent('')
    setInterest('')
    setDownPayment('')
    setPermonth('')
    setSubtotal('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container py={5}>
        <Grid item xs={12} md={7} display="flex" flexDirection="column" rowGap={3} px={{ xs: 2, md: 5 }}>
          <Stack direction="row" justifyContent="center" mb={5} display={{ xs: 'none', md: 'flex' }}>
            <TextUnderline
              bgColor="error.main"
              variant="subtitle1"
              component="div"
              color="secondary.main"
              text={commonLng.t('monthlyPayment')}
              height="3px"
              width="20%"
              left="40%"
              fontWeight={500}
            />
          </Stack>
          <Stack direction="column" rowGap={1}>
            <Typography variant="body2" color="body.main">
              {commonLng.t('carPrice')}
            </Typography>
            <TextField
              variant="outlined"
              placeholder={commonLng.t('carPrice')}
              sx={textFieldStyle}
              onChange={formatCarPrice}
              value={carPrice}
            />
          </Stack>

          <Stack direction="column" rowGap={1}>
            <Typography variant="body2" color="body.main">
              {commonLng.t('downPayment')}
            </Typography>
            <TextField
              variant="outlined"
              placeholder={commonLng.t('downPayment')}
              sx={textFieldStyle}
              onChange={(e) => setDownPaymentPercent(e.target.value.replace(/\D/g, ''))}
              value={downPaymentPercent}
            />
          </Stack>

          <Stack direction="column" rowGap={1}>
            <Typography variant="body2" color="body.main">
              {commonLng.t('loanTerm')}
            </Typography>
            <FormControl size="small">
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={selectCustom}
              >
                <MenuItem value="" disabled>
                  <Typography sx={selectCustom} color="rgba(51, 51, 51, 0.5)">
                    {commonLng.t('monthAmount')}
                  </Typography>
                </MenuItem>
                {numberOfMonths.map((item) => (
                  <MenuItem key={item} value={item} sx={selectCustom}>{`${item} ${commonLng.t('month')}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="column" rowGap={1}>
            <Typography variant="body2" color="body.main">
              {commonLng.t('interestRatePercent')}
            </Typography>
            <TextField
              variant="outlined"
              placeholder={commonLng.t('interestRatePercent')}
              sx={textFieldStyle}
              onChange={(e) => setInterest(e.target.value.replace(/\D/g, ''))}
              value={interest}
            />
          </Stack>

          <Stack direction="row" justifyContent="center" columnGap={2} mt={4}>
            <Button variant="outlined" onClick={clearForm}>
              <Typography variant="body2" color="primary.main" component="div" align="center">
                {commonLng.t('reset')}
              </Typography>
            </Button>
            <Button variant="contained" type="submit">
              <Typography variant="body2" color="white" component="div" align="center">
                {commonLng.t('calculate')}
              </Typography>
            </Button>
          </Stack>
        </Grid>

        <Grid
          item
          xs={5}
          display={{ xs: 'none', md: 'flex' }}
          flexDirection="column"
          rowGap={5}
          px={6}
          sx={{ borderLeft: '1px solid rgba(214, 214, 214, 1)' }}
        >
          <Typography variant="subtitle1" color="primary.main" fontWeight={500} component="div" align="center">
            {commonLng.t('loanCalculationResult')}
          </Typography>
          <Typography variant="body1" color="body.main" component="div" align="left">
            {commonLng.t('loanAmountBath')}
          </Typography>
          <Box sx={boxAnswer}>
            <Typography variant="body2" color="body.contrastText" fontSize={24}>
              {subtotal}
            </Typography>
          </Box>

          <Typography variant="body1" color="body.main" component="div" align="left">
            {commonLng.t('downPaymentBath')}
          </Typography>
          <Box sx={boxAnswer}>
            <Typography variant="body2" color="body.contrastText" fontSize={24}>
              {downPayment}
            </Typography>
          </Box>

          <Typography variant="body1" color="body.main" component="div" align="left">
            {commonLng.t('monthlyPaymentBath')}
          </Typography>
          <Box sx={boxAnswer}>
            <Typography variant="body2" color="body.contrastText" fontSize={24}>
              {permonth}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <DialogBase open={open} onClose={() => setOpen(!open)}>
        <Stack direction="column" rowGap={5} px={5}>
          <Typography variant="subtitle1" color="primary.main" fontWeight={500} component="div" align="left">
            {commonLng.t('loanCalculationResult')}
          </Typography>
          <Typography variant="body1" color="body.main" component="div" align="left">
            {commonLng.t('loanAmountBath')}
          </Typography>
          <Box sx={boxAnswer}>
            <Typography variant="body2" color="body.contrastText" fontSize={24}>
              {subtotal}
            </Typography>
          </Box>

          <Typography variant="body1" color="body.main" component="div" align="left">
            {commonLng.t('downPaymentBath')}
          </Typography>
          <Box sx={boxAnswer}>
            <Typography variant="body2" color="body.contrastText" fontSize={24}>
              {downPayment}
            </Typography>
          </Box>

          <Typography variant="body1" color="body.main" component="div" align="left">
            {commonLng.t('monthlyPaymentBath')}
          </Typography>
          <Box sx={boxAnswer}>
            <Typography variant="body2" color="body.contrastText" fontSize={24}>
              {permonth}
            </Typography>
          </Box>
        </Stack>
      </DialogBase>
    </form>
  )
}

const textFieldStyle = {
  '& .MuiOutlinedInput-input': {
    p: 1.5,
    fontSize: 14,
    backgroundColor: 'white',
    width: '100%'
  }
}

const selectCustom = {
  fontSize: 14
}

const boxAnswer = {
  borderBottom: 'solid 1px rgba(235, 235, 235, 1)',
  height: '35px'
}
