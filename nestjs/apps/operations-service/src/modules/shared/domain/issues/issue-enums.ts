export enum IssueSeverityLevelEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum IssuePartCategoryEnum {
  ENGINE = 'ENGINE',
  FUSELAGE = 'FUSELAGE',
  AVIONICS = 'AVIONICS'
}

export const IssueSeverityLevelValue = Object.values(IssueSeverityLevelEnum)
export const IssuePartCategoryValue = Object.values(IssuePartCategoryEnum)
