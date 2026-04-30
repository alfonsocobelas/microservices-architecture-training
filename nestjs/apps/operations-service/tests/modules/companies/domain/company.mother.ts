import { repeat } from '@libs/testing'
import { Company } from '../../../../src/modules/companies/domain/company'
import { CompanyPrimitiveProps, CompanyCreateProps } from '../../../../src/modules/companies/domain/company-types'
import { CompanyBuilder } from './company.builder'

export class CompanyMother {
  static fromInput(input: Partial<CompanyPrimitiveProps>): Company {
    return CompanyBuilder.aCompany().withProps(input as Partial<CompanyPrimitiveProps>).build()
  }

  static register(overrides?: Partial<CompanyCreateProps>): Company {
    return CompanyBuilder.aCompany().withProps(overrides).create()
  }

  static reconstruct(overrides?: Partial<CompanyPrimitiveProps>): Company {
    return CompanyBuilder.aCompany().withProps(overrides).build()
  }

  static random(): Company {
    return CompanyBuilder.aCompany().build()
  }

  static randomList(count: number = 5): Company[] {
    return repeat(() => this.random(), count)
  }

  static airbus(): Company {
    return CompanyBuilder
      .aCompany()
      .withName('Airbus')
      .build()
  }

  static boeing(): Company {
    return CompanyBuilder
      .aCompany()
      .withName('Boeing')
      .build()
  }
}
