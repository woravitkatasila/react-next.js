function convertYear(year: number, yearType: string) {
  switch (yearType) {
    case 'BE':
      return year + 543
    case 'BC':
      return year
    default:
      return year
  }
}
export function convertUTCDate(value = '', isShowTime = false, yearType = 'BE') {
  let date = new Date(value)
  let year = convertYear(date.getFullYear(), yearType)

  let day: string = String(date.getDate()).length === 1 ? `0${date.getDate()}` : `${date.getDate()}`

  let mounth: string = String(date.getMonth() + 1).length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`

  let newDate = `${day}/${mounth}/${year}`

  if (isShowTime) {
    let hour = String(date.getHours()).length === 1 ? `0${date.getHours()}` : date.getHours()
    let minute = String(date.getMinutes()).length === 1 ? `0${date.getMinutes()}` : date.getMinutes()
    // let second = date.getSeconds() > 10 ? date.getSeconds() : "0" + date.getSeconds()
    newDate += ` ${hour}:${minute}`
  }
  return newDate
}

export function convertStringDate(value = '', isTH = true) {
  let date = new Date(value)
  let year = convertYear(date.getFullYear(), isTH ? 'BE' : 'BC')

  // let day: string = String(date.getDate()).length === 1 ? `0${date.getDate()}` : `${date.getDate()}`
  let day: string = String(date.getDate())

  const monthsEN = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const monthsTH = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม'
  ]

  let month = isTH ? monthsTH[date.getMonth()] : monthsEN[date.getMonth()]
  //let newDate = `${day} ${month} ${year}`

  // if (isShowTime) {
  //   let hour = String(date.getHours()).length === 1 ? `0${date.getHours()}` : date.getHours()
  //   let minute = String(date.getMinutes()).length === 1 ? `0${date.getMinutes()}` : date.getMinutes()
  //   // let second = date.getSeconds() > 10 ? date.getSeconds() : "0" + date.getSeconds()
  //   newDate += ` ${hour}:${minute}`
  // }
  return `${day} ${month} ${year}`
}
