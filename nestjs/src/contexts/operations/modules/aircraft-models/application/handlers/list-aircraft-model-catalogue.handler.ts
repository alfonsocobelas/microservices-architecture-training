import { Injectable } from '@nestjs/common'
import { ListAircraftModelCatalogueUseCase } from '../use-cases/list-aircraft-model-catalogue-usecase.service'
import { ListAircraftModelCatalogueResponse } from '../../infrastructure/entrypoints/dtos/list-aircraft-model-catalogue.response'

@Injectable()
export class ListAircraftModelCatalogueHandler {
  constructor(
    private readonly useCase: ListAircraftModelCatalogueUseCase
  ) {}

  async handle(): Promise<ListAircraftModelCatalogueResponse[]> {
    const output = await this.useCase.invoke()

    return output.map(item => new ListAircraftModelCatalogueResponse(item))
  }
}
