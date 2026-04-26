import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Check, Index } from 'typeorm'
import { Nullable } from 'src/contexts/shared/types'
import { IssuePartCategoryEnum, IssueSeverityLevelEnum } from 'src/contexts/maintenance/modules/issues/domain/issue-enums'
import { ISSUE_CONSTRAINTS as LIMITS } from '../../../domain/issue-constants'

@Entity({ name: 'issues', schema: 'maintenance' })
@Check(`char_length("code") >= ${LIMITS.CODE.MIN_LENGTH} AND char_length("code") <= ${LIMITS.CODE.MAX_LENGTH}`)
@Check(`char_length("description") >= ${LIMITS.DESCRIPTION.MIN_LENGTH} AND char_length("description") <= ${LIMITS.DESCRIPTION.MAX_LENGTH}`)
@Index('IDX_ISSUE_CODE', ['code'], { unique: true })

export class IssueEntity {
  @PrimaryColumn('uuid')
    id!: string

  @Column('varchar', { unique: true, length: LIMITS.CODE.MAX_LENGTH })
    code!: string

  @Column('uuid', { nullable: true })
    aircraftId!: Nullable<string>

  @Column('uuid', { nullable: true })
    engineId!: Nullable<string>

  @Column('varchar', { length: LIMITS.DESCRIPTION.MAX_LENGTH })
    description!: string

  @Column({ type: 'enum', enum: IssueSeverityLevelEnum })
    severity!: IssueSeverityLevelEnum

  @Column({ type: 'boolean', default: false })
    requiresGrounding!: boolean

  @Column({ type: 'enum', enum: IssuePartCategoryEnum })
    partCategory!: IssuePartCategoryEnum

  // --- AUDIT FIELDS --- //
  @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date
}
