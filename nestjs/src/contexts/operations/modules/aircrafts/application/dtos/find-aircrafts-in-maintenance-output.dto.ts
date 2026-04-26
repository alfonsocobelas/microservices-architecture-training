export interface FindAircraftsInMaintenanceOutput {
    id: string
    modelId: string
    tailNumber: string
    totalFlightHours: number
    fuelLevelPercentage: number
    status: string
    isActive: boolean
    fleetId?: string
    engineIds: string[]
}
