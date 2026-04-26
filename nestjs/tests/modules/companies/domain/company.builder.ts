import { v7 as uuidv7 } from 'uuid'
import { Company } from 'src/contexts/operations/modules/companies/domain/company'
import { CompanyId } from 'src/contexts/shared/domain/value-objects/companies/company-id.vo'
import { CompanyName } from 'src/contexts/operations/modules/companies/domain/value-objects/company-name.vo'
import { CompanyPrimitiveProps } from 'src/contexts/operations/modules/companies/domain/company-types'
import { COMPANY_CONSTRAINTS as LIMITS } from 'src/contexts/operations/modules/companies/domain/company-constants'
import { randomString } from '../../shared/utils/random-string'

/**
 * IMPORTANT: In integration tests, be careful with fields that have uniqueness constraints.
 * You must set them manually to avoid collisions with other objects created in the database
 *  during test execution.
 */
export class CompanyBuilder {
  private props: CompanyPrimitiveProps = {
    id: uuidv7(),
    name: randomString(LIMITS.NAME.MIN_LENGTH, LIMITS.NAME.MAX_LENGTH)
  }

  static aCompany(): CompanyBuilder {
    return new CompanyBuilder()
  }

  withId(id: string): CompanyBuilder {
    this.props.id = id
    return this
  }

  withName(name: string): CompanyBuilder {
    this.props.name = name
    return this
  }

  withProps(overrides?: Partial<CompanyPrimitiveProps>): CompanyBuilder {
    this.props = { ...this.props, ...overrides }
    return this
  }

  create(): Company {
    return Company.create({
      id: CompanyId.create(this.props.id),
      name: CompanyName.create(this.props.name)
    })
  }

  build(): Company {
    return Company.fromPrimitives(this.props)
  }
}
