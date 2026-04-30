import { Issue } from '../../../../../src/modules/issues/domain/issue'
import { GetIssueOutput } from '../../../../../src/modules/issues/application/dtos/get-issue-output.dto'

export class GetIssueOutputMother {
  static fromDomain(issue: Issue): GetIssueOutput {
    return {
      id: issue.id.value,
      code: issue.code.value,
      description: issue.description.value,
      severity: issue.severity.value,
      requiresGrounding: issue.requiresGrounding.value,
      partCategory: issue.partCategory.value,
      aircraftId: issue.aircraftId?.value,
      engineId: issue.engineId?.value
    }
  }
}
