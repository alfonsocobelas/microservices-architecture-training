export interface GetIssueOutput {
  id: string
  code: string
  description: string
  severity: string
  requiresGrounding: boolean
  partCategory: string
  aircraftId?: string
  engineId?: string
}
