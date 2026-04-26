import { CompanyEntity } from './typeorm-company.entity'
import { Company } from '../../../domain/company'

export class CompanyMapper {
  static toDomain(props: CompanyEntity): Company {
    return Company.fromPrimitives({
      id: props.id,
      name: props.name
    })
  }

  static toPersistence(company: Company): CompanyEntity {
    const entity = new CompanyEntity()

    entity.id = company.id.value
    entity.name = company.name.value

    return entity
  }
}
