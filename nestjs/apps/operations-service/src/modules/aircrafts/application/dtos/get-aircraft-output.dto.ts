export interface GetAircraftOutput {
  id: string
  modelId: string
  tailNumber: string
  fleetId?: string
  engineIds: string[]
  isActive: boolean
  status: string
  totalFlightHours: number
  fuelLevelPercentage: number
  model?: {
    id: string
    name: string
    numEngines: number
  },
  engines?: Array<{
    id: string
    healthScore: number
  }>
}
