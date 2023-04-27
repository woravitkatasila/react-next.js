import api from './base-api'
import type ArticleApiType from '@type/api/article'

const articleApi: ArticleApiType = {
  findAll(params) {
    return api.get(`/article`, { params: { ...params } })
  },
  findOne(id) {
    return api.get(`/article/${id}`)
  },
  addView(id) {
    return api.put(`/article/${id}`)
  }
}
export default articleApi
