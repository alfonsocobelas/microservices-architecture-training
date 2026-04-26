import { v7 as uuidv7 } from 'uuid'
import { Issue } from 'src/contexts/maintenance/modules/issues/domain/issue'
import { IssuePrimitiveProps } from 'src/contexts/maintenance/modules/issues/domain/issue-types'
import { IssuePartCategoryEnum } from 'src/contexts/maintenance/modules/issues/domain/issue-enums'
import { IssueBuilder } from './issue.builder'
import { repeat } from '../../shared/utils/random-array'

export class IssueMother {
  static fromInput(input: Partial<IssuePrimitiveProps>): Issue {
    return IssueBuilder.anIssue().withProps(input as Partial<IssuePrimitiveProps>).build()
  }

  static register(overrides?: Partial<IssuePrimitiveProps>): Issue {
    return IssueBuilder.anIssue().withProps(overrides).create()
  }

  static reconstruct(overrides?: Partial<IssuePrimitiveProps>): Issue {
    return IssueBuilder.anIssue().withProps(overrides).build()
  }

  // todo: corregir, cuando sea tenga aircraftId tiene que ser avionics, cuando tenga engineId tiene que ser engine
  static random() {
    return IssueBuilder.anIssue().build()
  }

  static randomList(count: number = 5): Issue[] {
    return repeat(() => this.random(), count)
  }

  static avionics({ aircraftId = uuidv7(), id = uuidv7() } = {}): Issue {
    return IssueBuilder
      .anIssue()
      .withId(id)
      .withPartCategory(IssuePartCategoryEnum.AVIONICS)
      .withAircraftId(aircraftId)
      .build()
  }

  static engine({ engineId = uuidv7(), id = uuidv7() } = {}): Issue {
    return IssueBuilder
      .anIssue()
      .withId(id)
      .withPartCategory(IssuePartCategoryEnum.ENGINE)
      .withEngineId(engineId)
      .build()
  }
}
