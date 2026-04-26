import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Check, Index } from 'typeorm'
import { Nullable } from 'src/contexts/shared/types'
import { AircraftStatusEnum } from '../../../domain/aircraft-enums'
import { AIRCRAFT_CONSTRAINTS as LIMITS } from '../../../domain/aircraft-constants'

@Entity({ name: 'aircrafts', schema: 'operations' })
@Check(`"totalFlightHours" >= ${LIMITS.FLIGHT_HOURS.MIN} AND "totalFlightHours" <= ${LIMITS.FLIGHT_HOURS.MAX}`)
@Check(`"fuelLevelPercentage" >= ${LIMITS.FUEL_LEVEL.MIN} AND "fuelLevelPercentage" <= ${LIMITS.FUEL_LEVEL.MAX}`)
@Check(`char_length("tailNumber") >= ${LIMITS.TAIL_NUMBER.MIN_LENGTH} AND char_length("tailNumber") <= ${LIMITS.TAIL_NUMBER.MAX_LENGTH}`)
@Index('IDX_AIRCRAFT_TAIL_NUMBER', ['tailNumber'], { unique: true })

export class AircraftEntity {
  @PrimaryColumn('uuid')
    id!: string

  @Column('uuid', { nullable: true })
    fleetId!: Nullable<string>

  @Column('uuid')
    modelId!: string

  @Column('uuid', { array: true })
    engineIds!: string[]

  @Column('varchar', { length: LIMITS.TAIL_NUMBER.MAX_LENGTH, unique: true })
    tailNumber!: string

  @Column('float')
    totalFlightHours!: number

  @Column('int')
    fuelLevelPercentage!: number

  @Column('bool')
    isActive!: boolean

  @Column('enum', { enum: AircraftStatusEnum })
    status!: AircraftStatusEnum

  // --- AUDIT FIELDS --- //
  @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date
}
