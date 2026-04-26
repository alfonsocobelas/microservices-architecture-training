import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Check, Index } from 'typeorm'
import { Nullable } from 'src/contexts/shared/types'
import { EngineStatusEnum } from 'src//contexts/operations/modules/engines/domain/engine-enums'
import { ENGINE_CONSTRAINTS as LIMITS } from '../../../domain/engine-constants'

@Entity({ name: 'engines', schema: 'operations' })
@Check(`"healthScore" >= ${LIMITS.HEALTH_SCORE.MIN} AND "healthScore" <= ${LIMITS.HEALTH_SCORE.MAX}`)
@Check(`char_length("serialNumber") >= ${LIMITS.SERIAL_NUMBER.MIN_LENGTH} AND char_length("serialNumber") <= ${LIMITS.SERIAL_NUMBER.MAX_LENGTH}`)
@Index('IDX_ENGINE_SERIAL_NUMBER', ['serialNumber'], { unique: true })

export class EngineEntity {
  @PrimaryColumn('uuid')
    id!: string

  @Column('varchar', { length: LIMITS.SERIAL_NUMBER.MAX_LENGTH, unique: true })
    serialNumber!: string

  @Column('float')
    healthScore!: number

  @Column('float')
    flyingHoursAccumulated!: number

  @Column('int')
    cyclesSinceLastOverhaul!: number

  @Column('enum', { enum: EngineStatusEnum })
    status!: EngineStatusEnum

  @Column('boolean')
    isInstalled!: boolean

  @Column('uuid', { nullable: true })
    aircraftId!: Nullable<string>

  // --- AUDIT FIELDS --- //
  @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date
}

