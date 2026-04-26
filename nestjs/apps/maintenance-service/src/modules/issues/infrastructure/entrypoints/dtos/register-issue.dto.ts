import { IsNotEmpty, IsOptional, IsString, IsUUID, IsEnum, IsBoolean, MinLength, MaxLength } from 'class-validator'
import { IssuePartCategoryEnum, IssueSeverityLevelEnum } from 'src/contexts/maintenance/modules/issues/domain/issue-enums'
import { ISSUE_CONSTRAINTS as LIMITS } from 'src/contexts/maintenance/modules/issues/domain/issue-constants'

export class RegisterIssueDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    id!: string

  @IsString()
  @IsOptional()
  @IsUUID('7')
    aircraftId?: string

  @IsString()
  @IsOptional()
  @IsUUID('7')
    engineId?: string

  @IsString()
  @IsNotEmpty()
  @MinLength(LIMITS.CODE.MIN_LENGTH)
  @MaxLength(LIMITS.CODE.MAX_LENGTH)
    code!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(LIMITS.DESCRIPTION.MIN_LENGTH)
  @MaxLength(LIMITS.DESCRIPTION.MAX_LENGTH)
    description!: string

  @IsEnum(IssueSeverityLevelEnum)
  @IsNotEmpty()
    severity!: IssueSeverityLevelEnum

  @IsBoolean()
  @IsNotEmpty()
    requiresGrounding!: boolean

  @IsEnum(IssuePartCategoryEnum)
  @IsNotEmpty()
    partCategory!: IssuePartCategoryEnum
}
