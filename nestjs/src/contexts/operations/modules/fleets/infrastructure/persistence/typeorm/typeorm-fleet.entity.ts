import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index, Check } from 'typeorm'
import { FleetOperationRegionEnum, FleetStatusEnum, FleetTypeEnum } from 'src/contexts/operations/modules/fleets/domain/fleet-enums'
import { FLEET_CONSTRAINTS as LIMITS } from '../../../domain/fleet-constants'

@Entity({ name: 'fleets', schema: 'operations' })
@Check(`char_length("name") >= ${LIMITS.NAME.MIN_LENGTH} AND char_length("name") <= ${LIMITS.NAME.MAX_LENGTH}`)
@Index('IDX_FLEET_NAME', ['name'], { unique: true })

export class FleetEntity {
  @PrimaryColumn('uuid')
    id!: string

  @Column('uuid', { array: true })
    aircraftIds!: string[]

  @Column('uuid')
    companyId!: string

  @Column('varchar', { length: LIMITS.NAME.MAX_LENGTH, unique: true })
    name!: string

  @Column('enum', { enum: FleetOperationRegionEnum })
    operationRegion!: FleetOperationRegionEnum

  @Column('enum', { enum: FleetTypeEnum })
    type!: FleetTypeEnum

  @Column('float')
    maintenanceBudget!: number

  @Column('enum', { enum: FleetStatusEnum })
    status!: FleetStatusEnum

  // --- AUDIT FIELDS --- //
  @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date
}
