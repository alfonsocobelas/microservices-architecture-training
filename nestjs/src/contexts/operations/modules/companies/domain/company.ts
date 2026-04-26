import { AggregateRoot } from 'src/contexts/shared/domain/aggregate-root'
import { CompanyId } from 'src/contexts/shared/domain/value-objects/companies/company-id.vo'
import { CompanyAggregateProps, CompanyPrimitiveProps } from './company-types'
import { CompanyName } from './value-objects/company-name.vo'
import { CompanyRemovedDomainEvent } from './events/company-removed.event'
import { CompanyRegisteredDomainEvent } from './events/company-registered.event'

export class Company extends AggregateRoot {
  private constructor(
    readonly id: CompanyId,
    readonly name: CompanyName
  ) {
    super()
  }

  static create(props: CompanyAggregateProps): Company {
    const company = new Company(
      props.id,
      props.name
    )

    company.record(new CompanyRegisteredDomainEvent({
      aggregateId: props.id.value,
      name: props.name.value
    }))

    return company
  }

  static fromPrimitives(props: CompanyPrimitiveProps): Company {
    return new Company(
      CompanyId.create(props.id),
      CompanyName.create(props.name)
    )
  }

  toPrimitives(): CompanyPrimitiveProps {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }

  equals(other: AggregateRoot): boolean {
    if (!(other instanceof Company)) {
      return false
    }

    return this.id.equals(other.id) &&
      this.name.equals(other.name)
  }

  remove(): void {
    this.record(new CompanyRemovedDomainEvent({
      aggregateId: this.id.value,
      name: this.name.value
    }))
  }
}
