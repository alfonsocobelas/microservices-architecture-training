export interface SearchFleetOutput {
  id: string
  name: string
  type: string
  status: string
  companyId: string
  aircraftIds: string[]
  operationRegion: string
  maintenanceBudget: number
}
