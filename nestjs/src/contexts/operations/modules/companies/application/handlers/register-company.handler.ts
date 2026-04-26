import { Injectable } from '@nestjs/common'
import { RegisterCompanyDto } from '../../infrastructure/entrypoints/dtos/register-company.dto'
import { RegisterCompanyUseCase } from '../use-cases/register-company-usecase.service'

@Injectable()
export class RegisterCompanyHandler {
  constructor(
    private readonly useCase: RegisterCompanyUseCase
  ) {}

  async handle(dto: RegisterCompanyDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
