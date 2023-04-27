import { AxiosResponse } from 'axios'
import type { PaginationParams } from '@type/api/pagination'
import type { ResponseType } from '@type/api/response-type'

export default interface ArticleApiType {
  findAll(params: PaginationParams): Promise<AxiosResponse<ResponseType<FindAllData[]>>>
  findOne(id: number): Promise<AxiosResponse<FindOne>>
  addView(id: number): Promise<AxiosResponse<any>>
}

interface FindAllData {
  id: number
  filePath: string
  banner: string
  title: string
  subTitle: string
  content: string
  viewer: number
  status: string
  createdBy: string
}

interface FindOne {
  TH: FindOneData
  EN: FindOneData
}
interface FindOneData {
  id: number | null
  filePath: string
  banner: string
  title: string
  content: string
  viewer: number
}
export type { FindAllData, FindOneData }
