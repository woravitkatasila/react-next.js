import { useState, FormEvent, ChangeEvent } from 'react'
import { useTranslation } from 'next-i18next'

/**
 * MUI
 **/
import { Stack, Typography, TextField, Grid, FormControl, Select, MenuItem, Button, Box } from '@mui/material'

/**
 * COMPONENTS
 **/
import TextUnderline from '@components/text-underline'
import DialogBase from '@components/dialog/base'

import { numberOfMonths2 } from '@constants/loan'

export default function LoanAmount() {
  const commonLng = useTranslation('common')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [interest, setInterest] = useState('')
  const [amountReq, setAmountReq] = useState('')
  const [price, setPrice] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedMonth || !interest || !amountReq) {
      setPrice('')
      return
    }

    let price1 =
      (Number(amountReq.replaceAll(',', '')) +
        Number(amountReq.replaceAll(',', '')) * (Number(interest) / 100) * (Number(selectedMonth) / 12)) /
      Number(selectedMonth)
    setPrice(String(price1.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')))

    if (window.innerWidth < 900) setOpen(true)
  }

  const formatAmountReq = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    setAmountReq(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
  }

  const clearForm = () => {
    setSelectedMonth('')
    setInterest('')
    setAmountReq('')
    setPrice('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent="center" py={5}>
        <Grid
          item
          xs={12}
          md={7}
          rowGap={5}
          px={{ xs: 2, md: 5 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Stack direction="row" justifyContent="center" display={{ xs: 'none', md: 'flex' }}>
            <TextUnderline
              bgColor="error.main"
              variant="subtitle1"
              component="div"
              color="secondary.main"
              text={commonLng.t('loanAmount')}
              height="3px"
              width="20%"
              left="40%"
              fontWeight={500}
            />
          </Stack>

          <Stack direction="column" rowGap={1}>
            <Typography variant="body2" color="body.main">
              {commonLng.t('amountRequested')}
            </Typography>
            <TextField
              variant="outlined"
              placeholder={commonLng.t('amountRequested')}
              sx={textFieldStyle}
              onChange={formatAmountReq}
              value={amountReq}
            />
          </Stack>

          <Stack direction="column" rowGap={1}>
            <Typography variant="body2" color="body.main">
              {commonLng.t('numberOfInstallmentsToBePaid')}
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
                {numberOfMonths2.map((item) => (
                  <MenuItem key={item} value={item} sx={selectCustom}>{`${item} ${commonLng.t('month')}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="column" rowGap={1}>
            <Typography variant="body2" color="body.main">
              {commonLng.t('interestRatePerYear')}
            </Typography>
            <TextField
              variant="outlined"
              placeholder={commonLng.t('interestRatePerYear')}
              sx={textFieldStyle}
              onChange={(e) => setInterest(e.target.value.replace(/\D/g, ''))}
              value={interest}
            />
          </Stack>

          <Stack direction="row" justifyContent="center" columnGap={2} mt={2}>
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

          <Stack direction="column" rowGap={5} display={{ xs: 'none', md: 'flex' }}>
            <Typography variant="subtitle1" color="primary.main" fontWeight={500} component="div" align="left">
              {commonLng.t('loanCalculationResult')}
            </Typography>
            <Stack direction="column" rowGap={1}>
              <Typography variant="body2" color="body.main">
                {commonLng.t('installmentAmountPerInstallment')}
              </Typography>
              <Box sx={boxAnswer}>
                <Typography variant="body2" color="body.contrastText" fontSize={24}>
                  {price}
                </Typography>
                <Typography variant="body2" color="body.main">
                  {commonLng.t('baht')}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Typography variant="content" color="body.contrastText" fontSize={14}>
            {commonLng.t('loanAmountNote')}
          </Typography>
        </Grid>
      </Grid>
      <DialogBase open={open} onClose={() => setOpen(!open)}>
        <Stack direction="column" rowGap={5} px={5}>
          <Typography variant="subtitle1" color="primary.main" fontWeight={500} component="div" align="left">
            {commonLng.t('loanCalculationResult')}
          </Typography>
          <Stack direction="column" rowGap={1}>
            <Typography variant="body2" color="body.main">
              {commonLng.t('installmentAmountPerInstallment')}
            </Typography>
            <Box sx={boxAnswer}>
              <Typography variant="body2" color="body.contrastText" fontSize={24}>
                {price}
              </Typography>
              <Typography variant="body2" color="body.main">
                {commonLng.t('baht')}
              </Typography>
            </Box>
          </Stack>
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
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: 'solid 1px rgba(235, 235, 235, 1)',
  height: '35px'
}
