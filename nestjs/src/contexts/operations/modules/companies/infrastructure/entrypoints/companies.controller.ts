import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ParseUUIDv7Pipe } from 'src/contexts/shared/infrastructure/pipes/parse-uuid-v7.pipe'
import { RegisterCompanyDto } from './dtos/register-company.dto'
import { GetCompanyResponse } from './dtos/get-company.response'
import { GetCompanyHandler } from '../../application/handlers/get-company.handler'
import { RemoveCompanyHandler } from '../../application/handlers/remove-company.handler'
import { RegisterCompanyHandler } from '../../application/handlers/register-company.handler'

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly registerCompanyHandler: RegisterCompanyHandler,
    private readonly getCompanyHandler: GetCompanyHandler,
    private readonly removeCompanyHandler: RemoveCompanyHandler
  ) {}

  @Post()
  register(@Body() body: RegisterCompanyDto): Promise<void> {
    return this.registerCompanyHandler.handle(body)
  }

  @Get(':id')
  get(@Param('id', ParseUUIDv7Pipe) id: string): Promise<GetCompanyResponse> {
    return this.getCompanyHandler.handle(id)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDv7Pipe) id: string): Promise<void> {
    return this.removeCompanyHandler.handle(id)
  }
}
