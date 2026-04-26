import { Injectable } from '@nestjs/common'
import { EventBus } from 'src/contexts/shared/domain/event-bus/event-bus'
import { CompanyId } from 'src/contexts/shared/domain/value-objects/companies/company-id.vo'
import { EntityNotFoundError } from 'src/contexts/shared/errors'
import { RemoveCompanyInput } from '../dtos/remove-company-input.dto'
import { CompanyRepository } from '../../domain/company.repository'

@Injectable()
export class RemoveCompanyUseCase {
  constructor(
    private readonly repository: CompanyRepository,
    private readonly eventBus: EventBus
  ) {}

  async invoke(input: RemoveCompanyInput): Promise<void> {
    const companyId = CompanyId.create(input.id)

    const company = await this.repository.get(companyId)
    if (!company) {
      throw new EntityNotFoundError('Company', companyId.value)
    }

    company.remove()

    await this.repository.remove(companyId)
    await this.eventBus.publish(company.pullDomainEvents())
  }
}
