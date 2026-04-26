export enum FleetOperationRegionEnum {
  AMER = 'AMER',
  EMEA = 'EMEA',
  APAC = 'APAC'
}

export enum FleetTypeEnum {
  CARGO = 'CARGO',
  PASSENGER = 'PASSENGER',
  MILITARY = 'MILITARY',
  PRIVATE = 'PRIVATE',
  SPECIALIZED = 'SPECIALIZED'
}

export enum FleetStatusEnum {
  DRAFT = 'DRAFT',
  OPERATIVE = 'OPERATIVE',
  RETIRED = 'RETIRED',
  SCRAPPED = 'SCRAPPED'
}

export const FleetFleetOperationRegionValues = Object.values(FleetOperationRegionEnum)
export const FleetTypeValues = Object.values(FleetTypeEnum)
export const FleetStatusValues = Object.values(FleetStatusEnum)
