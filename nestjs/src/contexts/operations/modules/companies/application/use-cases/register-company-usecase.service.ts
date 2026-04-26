import { Injectable } from '@nestjs/common'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { AlreadyExistsError } from 'src/contexts/shared/errors'
import { RegisterCompanyInput } from '../dtos/register-company-input.dto'
import { Company } from '../../domain/company'
import { CompanyRepository } from '../../domain/company.repository'
import { CompanyInputMapper } from '../../domain/company-factory'

@Injectable()
export class RegisterCompanyUseCase {
  constructor(
    private readonly repository: CompanyRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: RegisterCompanyInput): Promise<void> {
    const props = CompanyInputMapper.toDomain(input)

    const companyExists = await this.repository.exists(props.name)
    if (companyExists) {
      throw new AlreadyExistsError('Company', 'name', props.name.value)
    }

    const company = Company.create(props)

    await this.repository.register(company)
    await this.eventBus.publish(company.pullDomainEvents())
  }
}
