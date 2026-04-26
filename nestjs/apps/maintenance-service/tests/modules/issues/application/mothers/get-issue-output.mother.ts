import { GetIssueOutput } from 'src/contexts/maintenance/modules/issues/application/dtos/get-issue-output.dto'
import { Issue } from 'src/contexts/maintenance/modules/issues/domain/issue'

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
