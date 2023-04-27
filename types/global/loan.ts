export interface Loan {
  id: number
  name: string
  detail: string
  img: string
  carTypes: Array<{
    name: string
    detail: string
  }>
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
