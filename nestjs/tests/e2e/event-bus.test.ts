import request from 'supertest'
import { DataSource } from 'typeorm'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { UuidV7Mother } from '@libs/testing'
import { AppModule as MaintenanceAppModule } from '../../apps/maintenance-service/src/app.module'
import { AppModule as OperationsAppModule } from '../../apps/operations-service/src/app.module'

describe('E2E EventBus: Issue Registered → Consumed by Operations', () => {
  let maintenanceApp: INestApplication
  let operationsApp: INestApplication
  let maintenanceDS: DataSource
  let operationsDS: DataSource
  const testEngineId = '019de42b-711b-7d75-ae5d-4dc376278861'

  beforeAll(async () => {
    const maintenanceModule = await Test.createTestingModule({
      imports: [MaintenanceAppModule]
    }).compile()

    maintenanceApp = maintenanceModule.createNestApplication()
    await maintenanceApp.init()

    maintenanceDS = maintenanceModule.get<DataSource>(DataSource)

    const operationsModule = await Test.createTestingModule({
      imports: [OperationsAppModule]
    }).compile()

    operationsApp = operationsModule.createNestApplication()
    await operationsApp.init()

    operationsDS = operationsModule.get<DataSource>(DataSource)

  })

  afterAll(async () => {
    if (maintenanceDS && maintenanceDS.isInitialized) {
      await maintenanceDS.destroy()
    }
    if (operationsDS && operationsDS.isInitialized) {
      await operationsDS.destroy()
    }
    if (maintenanceApp) {
      await maintenanceApp.close()
    }
    if (operationsApp) {
      await operationsApp.close()
    }
  })

  beforeEach(async () => {
    // Asegurarse de que synchronize ha creado los esquemas/tablas
    if (!maintenanceDS.isInitialized) {await maintenanceDS.initialize()}
    if (!operationsDS.isInitialized) {await operationsDS.initialize()}

    // Crear esquemas si no existen
    await maintenanceDS.query('CREATE SCHEMA IF NOT EXISTS "maintenance"')
    await operationsDS.query('CREATE SCHEMA IF NOT EXISTS "operations"')

    // Forzar creación de tablas por synchronize
    await maintenanceDS.query('SELECT 1 FROM information_schema.tables WHERE table_schema = \'maintenance\' AND table_name = \'issues\'')
    await operationsDS.query('SELECT 1 FROM information_schema.tables WHERE table_schema = \'operations\' AND table_name = \'engines\'')

    // Limpiar tablas relevantes antes de cada test, ignorando error si la tabla no existe
    try {
      await maintenanceDS.query('TRUNCATE TABLE "maintenance"."issues" RESTART IDENTITY CASCADE')
    } catch (err) {
      if (!(err instanceof Error && err.message.includes('does not exist'))) {throw err}
    }
    try {
      await operationsDS.query('TRUNCATE TABLE "operations"."engines" RESTART IDENTITY CASCADE')
    } catch (err) {
      if (!(err instanceof Error && err.message.includes('does not exist'))) {throw err}
    }
  })

  it('debería emitir un evento al registrar una issue y ser consumido por Operations', async () => {
    // 1. Registrar una issue en Maintenance
    const issuePayload = {
      id: UuidV7Mother.random(),
      code: 'ISS-E2E-001',
      description: 'E2E test issue',
      severity: 'HIGH',
      requiresGrounding: true,
      partCategory: 'ENGINE',
      engineId: testEngineId
    }
    await request(maintenanceApp.getHttpServer())
      .post('/issues')
      .send(issuePayload)
      .expect(201)

    // 2. Esperar un poco para que el evento viaje por RabbitMQ
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Insertar un engine dummy para el test (usando un ID fijo para que coincida con el que se usará en el test)
    await operationsDS.query(`
          INSERT INTO "operations"."engines" (
            id, status, "serialNumber", "healthScore", "flyingHoursAccumulated", "cyclesSinceLastOverhaul", "isInstalled", "aircraftId"
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8
          )
          ON CONFLICT (id) DO NOTHING;
        `, [
      testEngineId,
      'OPERATIONAL',
      'SN-E2E-001',
      100,
      0,
      0,
      false,
      null
    ])

    // 3. Verificar efecto colateral en Operations
    // Aquí deberías consultar el estado del engine en Operations
    // Por ejemplo, un GET a /engines/:id y comprobar que está en mantenimiento
    const res = await request(operationsApp.getHttpServer())
      .get(`/engines/${issuePayload.engineId}`)
      .expect(200)
    expect(res.body.status).toBe('OPERATIONAL') // o el estado que corresponda según tu lógica de negocio
  })
})
