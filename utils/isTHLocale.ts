const checkIsTHLocale = (locale: string = 'th') => {
  let result = true
  if (locale === 'th') result = true
  else return (result = false)
  return result
}

export default checkIsTHLocale
