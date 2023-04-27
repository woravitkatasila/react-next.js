export interface News {
  id: number
  name: string
  bannerImg: string
  detail: string
  features: string[]
  qualification: {
    person: string[]
    organization: string[]
  }
  documents: {
    person: string[]
    organization: string[]
    foreigner: string[]
    condition: string[]
  }
}
