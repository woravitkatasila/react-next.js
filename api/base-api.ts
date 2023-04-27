import axios, { AxiosInstance } from 'axios'

const baseURL = `${process.env.BASE_API}/api` || 'https://redesign-api.knacx.dev/api'
function createInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL
  })

  instance.interceptors.request.use((config) => {
    return config
  })
  instance.interceptors.response.use(
    (resp) => {
      // const { error } = resp.data
      // if (`${statusCode}` === `${401}` || errorDescription === 'jwt expired') {
      //   localStorage.clear()
      //   window.location.href = '/signin'
      // }
      //   if (error) return error
      return resp
    }
    // (err) => {
    //   if (err.response) {
    //     console.log('error', err.response)
    //     // const { code, message } = err.response.data
    //     // if (`${code}` === `${401}` || message === 'jwt expired') {
    //     //   localStorage.clear()
    //     //   window.location.href = '/signin'
    //     // }
    //   }
    //   return err
    // }
  )

  return instance
}

const api = createInstance()
export default api
