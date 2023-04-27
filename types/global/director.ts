export interface Director {
  directorId: number
  filePath: string
  imgWidth: number
  imgHeight: number
  name: string
  position: string
  dateAppoint: string
  age: string
  education: string[]
  training: Array<{
    name: string
    courses: string[]
  }>
  positionInOtherListedCompany: Array<{
    period: string
    positions: string[]
  }>
  positionInOtherNonListedCompany: Array<{
    period: string
    positions: string[]
  }>
  experience: Array<{
    period: string
    positions: string[]
  }>
}
