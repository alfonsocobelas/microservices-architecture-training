export interface SearchAircraftOutput {
  id: string
  status: string
  modelId: string
  fleetId?: string
  isActive: boolean
  engineIds: string[]
  tailNumber: string
  totalFlightHours: number
  fuelLevelPercentage: number
}
