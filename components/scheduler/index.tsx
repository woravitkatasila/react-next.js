import { useState, useEffect, Fragment } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

/**
 * MUI
 **/
import { Box, Typography, Avatar, Grid, IconButton, List, ListItem, Divider, Chip, Stack } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

/**
 * COMPONENTS
 **/
import ArrowLeftIcon from '@components/icons/arrowLeft'
import ArrowRightIcon from '@components/icons/arrowRight'
import DownloadDocIcon from '@components/icons/downloadDoc'
import DialogBase from '@components/dialog/base'

import { BASE_URL } from '@constants/config'

/**
 * API
 **/
import calendarApi from '@api/calendar'

import checkIsTHLocale from '@utils/isTHLocale'

interface Calendar {
  day: string
  type: 'today' | 'normal' | 'otherMonths'
  events: Array<{
    title: string
    file: Array<{
      id: number
      calendarId: number
      filePath: string
      fileName: string
    }>
  }>
}

dayjs.extend(buddhistEra)

const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

export default function Scheduler() {
  const carlendarLng = useTranslation('calendar')
  const commonLng = useTranslation('common')
  const router = useRouter()
  const [calendar, setCalendar] = useState<Calendar[]>([])
  const [datepicker, setDatepicker] = useState<Dayjs | null>(dayjs())
  const [dayActive, setDayActive] = useState<number | null>(null)
  const [open, setOpen] = useState(false)

  const dateformatsTH = {
    year: 'BBBB',
    monthAndYear: 'MMMM BBBB'
  }
  const dateformatsEN = {
    year: 'YYYY',
    monthAndYear: 'MMMM YYYY'
  }

  useEffect(() => {
    if (datepicker) getDays()
  }, [datepicker])

  const changeMonth = (type: 'prev' | 'next') => () => {
    if (type === 'next' && datepicker?.month() === 11) {
      setDatepicker(dayjs(`${datepicker && datepicker?.year() + 1}-${1}-1`))
      return
    }
    if (type === 'prev' && datepicker?.month() === 0) {
      setDatepicker(dayjs(`${datepicker && datepicker?.year() - 1}-${12}-1`))
      return
    }
    if (type === 'next') setDatepicker(dayjs(`${datepicker?.year()}-${datepicker && datepicker?.month() + 2}-1`))
    if (type === 'prev') setDatepicker(dayjs(`${datepicker?.year()}-${datepicker && datepicker?.month()}-1`))
  }

  async function getDays() {
    const daysInMonth = datepicker?.daysInMonth()
    const lastdayOfPrevMonth = dayjs(`${datepicker?.year()}-${datepicker && datepicker?.month()}-1`).daysInMonth()
    const firstdayOfMonth = dayjs(`${datepicker?.year()}-${datepicker && datepicker?.month() + 1}-1`).day()

    let calendarRow = 42
    let calendarItems: Calendar[] = Array.from({ length: calendarRow }, () => ({
      day: '',
      events: [],
      type: 'normal'
    }))
    let currentDay = 0
    let dayNextMonth = 0
    let isFiveRow = false

    const { data } = await calendarApi.findOne(String(datepicker?.year()))

    Promise.all(
      calendarItems.map((item, idx) => {
        if (isFiveRow) return

        if (Number(firstdayOfMonth) > idx) {
          //prev month
          item.day = String(lastdayOfPrevMonth - Number(firstdayOfMonth) + idx + 1)
          item.type = 'otherMonths'
        }

        if (Number(firstdayOfMonth) <= idx && currentDay <= Number(daysInMonth)) {
          //current month
          currentDay++
          item.day = `${currentDay}`

          for (const { date: dateInData, titleEN, titleTH, file } of data) {
            let date = new Date(dateInData)
            if (
              date.getDate() === Number(item.day) &&
              date.getMonth() === datepicker?.month() &&
              date.getFullYear() === datepicker?.year()
            ) {
              item.events.push({
                title: checkIsTHLocale(String(router.query.locale)) ? titleTH : titleEN,
                file
              })
            }
          }
        }

        if (Number(firstdayOfMonth) <= idx && currentDay > Number(daysInMonth)) {
          //next month
          dayNextMonth++
          item.day = `${dayNextMonth}`
          item.type = 'otherMonths'
        }

        if (
          dayjs().date() === currentDay &&
          dayjs().month() === datepicker?.month() &&
          dayjs().year() === datepicker?.year()
        )
          item.type = 'today'

        if (idx === 35 && dayNextMonth > 0 && dayNextMonth < 20) isFiveRow = true
      })
    )
    if (isFiveRow) calendarItems.splice(35, 7)

    setCalendar(calendarItems)
  }

  const showDay = (day: string, haveEvents: boolean) => {
    if (haveEvents) {
      if (window.innerWidth < 1200) setOpen(true)
      setDayActive(Number(day))
    }
  }

  const downloadFile = (filePath: string, filename: string) => {
    const link = document.createElement('a')
    link.href = `${BASE_URL}${filePath}`
    link.download = `${BASE_URL}/${filename}`
    link.target = '_blank'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  interface AuctionListProps {
    calendar: Calendar
  }
  const AuctionList = ({ calendar: item }: AuctionListProps) => {
    return (
      <>
        <ListItem disablePadding>
          <Stack direction="column" rowGap={1} px={1}>
            <Typography variant="subtitle1" component="div" color="primary.main">
              <Typography variant="h6" component="span" color="primary.main">
                {item.day}{' '}
              </Typography>
              {carlendarLng.t(`month.${months[datepicker?.month() || 0]}`)}{' '}
              {checkIsTHLocale(String(router.query.locale))
                ? datepicker && datepicker.year() + 543
                : datepicker?.year()}
            </Typography>
            {item.events.map(({ title, file }) => (
              <Stack direction="column" rowGap={1} key={title}>
                <Typography variant="body1" component="div" color="body.contrastText">
                  • {title}
                </Typography>
                {file.map(({ filePath, fileName }) => (
                  <Stack
                    direction="row"
                    columnGap={1}
                    sx={{ cursor: 'pointer', ml: 1 }}
                    onClick={() => downloadFile(filePath, fileName)}
                  >
                    <DownloadDocIcon />
                    <Typography variant="caption" component="span" color="primary.main">
                      {filePath.replace('/files/', '').split(' ')[0]}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            ))}
          </Stack>
        </ListItem>
        <Divider sx={{ my: 2 }} />
      </>
    )
  }

  return (
    <>
      <Grid container columnGap={4} rowGap={3} columns={12.3}>
        <Grid item xs={12} lg={8.5}>
          <Grid container sx={boxCalendar.header}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Box sx={boxCalendar.boxTextMonth}>
                <IconButton aria-label="left arrow" onClick={changeMonth('prev')}>
                  <ArrowLeftIcon />
                </IconButton>
                <Typography component="span" color="white" align="center" sx={{ fontWeight: 500, width: '150px' }}>
                  {carlendarLng.t(`month.${months[datepicker?.month() || 0]}`)}{' '}
                  {checkIsTHLocale(String(router.query.locale))
                    ? datepicker && datepicker.year() + 543
                    : datepicker?.year()}
                </Typography>
                <IconButton aria-label="right arrow" onClick={changeMonth('next')}>
                  <ArrowRightIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end" alignItems="center">
              <LocalizationProvider
                adapterLocale={checkIsTHLocale(String(router.query.locale)) ? 'th' : 'en'}
                dateAdapter={AdapterDayjs}
                dateFormats={checkIsTHLocale(String(router.query.locale)) ? dateformatsTH : dateformatsEN}
              >
                <DesktopDatePicker
                  views={['year', 'month']}
                  minDate={dayjs('2000-01-01')}
                  maxDate={dayjs('2025-12-31')}
                  value={datepicker}
                  onChange={(newValue) => setDatepicker(newValue)}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
                      <input ref={inputRef} {...inputProps} style={{ visibility: 'hidden' }} />
                      <Box sx={{ '& .MuiSvgIcon-root': { color: 'white' } }}>{InputProps?.endAdornment}</Box>
                    </Box>
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Box sx={boxCalendar.containerDay}>
            {days.map((item) => (
              <Box sx={[boxCalendar.boxHeaderDay]} key={item}>
                <Typography component="div" color="body.light">
                  {carlendarLng.t(`day.${item}`)}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={boxCalendar.containerDay}>
            {calendar.map(({ day, type, events }, idx) => (
              <Box
                sx={[
                  boxCalendar.boxDay,
                  dayActive === Number(day) && boxCalendar.boxDayActive,
                  events.length !== 0 && { cursor: 'pointer' },
                  calendar.length === 42 && idx === 35 && { borderBottomLeftRadius: 10 },
                  calendar.length === 35 && idx === 28 && { borderBottomLeftRadius: 10 },
                  calendar.length === 42 && idx === 41 && { borderBottomRightRadius: 10 },
                  calendar.length === 35 && idx === 34 && { borderBottomRightRadius: 10 }
                ]}
                key={idx}
                onClick={() => showDay(day, events.length !== 0 ? true : false)}
              >
                <Stack direction="row" minHeight={{ xs: 30, sm: 40 }}>
                  {type === 'today' && (
                    <Avatar sx={{ bgcolor: 'primary.main', width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }}>
                      <Typography component="div" color="white" fontWeight={{ xs: 400, sm: 600 }}>
                        {day}
                      </Typography>
                    </Avatar>
                  )}
                  {type === 'normal' && (
                    <Typography
                      component="div"
                      fontWeight={{ xs: 400, sm: 600 }}
                      sx={
                        events.length !== 0
                          ? { color: 'primary.main', fontWeight: 600 }
                          : { color: 'body.contrastText' }
                      }
                    >
                      {day}
                    </Typography>
                  )}
                  {type === 'otherMonths' && (
                    <Typography component="div" color="body.light" fontWeight={{ xs: 400, sm: 600 }}>
                      {day}
                    </Typography>
                  )}
                </Stack>
                {events.length !== 0 && (
                  <Stack direction="column" rowGap={0.5} display={{ xs: 'flex', sm: 'none' }} sx={boxChip}></Stack>
                )}
                <Stack direction="column" rowGap={0.5} display={{ xs: 'none', sm: 'flex' }}>
                  {events.length !== 0 && (
                    <Chip
                      key={events[0].title}
                      label={events[0].title}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ cursor: 'pointer' }}
                    />
                  )}
                  {events.length > 1 && (
                    <Chip
                      key={`event-${events.length}`}
                      label={`+${events.length - 1}`}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ cursor: 'pointer' }}
                    />
                  )}
                </Stack>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item sm={12} lg={3.2} sx={boxList.container} display={{ xs: 'none', lg: 'block' }}>
          <Typography variant="h5" align="center" component="div" color="secondary.main" my={2}>
            {commonLng.t('autionCarList')}
          </Typography>
          <List sx={boxList.list}>
            {calendar.map(
              (item, idx) =>
                dayActive &&
                Number(item.day) === dayActive &&
                item.type !== 'otherMonths' && (
                  <Fragment key={`list${idx}`}>
                    <AuctionList calendar={item} />
                  </Fragment>
                )
            )}
          </List>
        </Grid>
      </Grid>
      <Typography variant="caption" color="body.contrastText" component="div" sx={{ mt: 2 }}>
        {commonLng.t('note')} : {commonLng.t('autionCalendarChange')}
      </Typography>
      <DialogBase open={open} onClose={() => setOpen(!open)} height="auto">
        <Typography variant="body1" align="left" component="div" color="secondary.main" mb={2} ml={2}>
          {commonLng.t('autionCarList')}
        </Typography>
        {calendar.map(
          (item, idx) =>
            dayActive &&
            Number(item.day) === dayActive &&
            item.type !== 'otherMonths' && (
              <Box sx={{ ml: 1, mr: 5, mb: 5 }} key={`list${idx}`}>
                <AuctionList calendar={item} />
              </Box>
            )
        )}
      </DialogBase>
    </>
  )
}

const boxCalendar = {
  header: {
    backgroundColor: 'primary.main',
    p: 1,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  boxTextMonth: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 5
  },
  boxHeaderDay: {
    p: 1,
    width: '14.285%',
    background: '#FFFFFF',
    textAlign: 'center'
  },
  containerDay: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  boxDay: {
    py: 1.5,
    px: 1,
    width: '14.285%',
    height: { xs: 'auto', sm: 130 },
    background: '#FFFFFF',
    border: { xs: 'none', sm: ' 0.8px solid #E0E0E0' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: { xs: 'center', sm: 'flex-start' },
    rowGap: { xs: 0, sm: 1, md: 1.5 },
    overflowX: 'auto'
  },
  boxDayActive: {
    background: { xs: '#fff', sm: '#E6F7F4' }
  }
}

const boxChip = {
  height: 4,
  width: '100%',
  backgroundColor: 'primary.main'
}

const boxList = {
  container: {
    p: 1,
    background: '#FFFFFF',
    border: ' 0.8px solid #E0E0E0',
    borderRadius: 3
  },
  list: {
    height: { sm: 'auto ', lg: 600 },
    overflow: 'auto'
  }
}
