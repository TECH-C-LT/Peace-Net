import { IUsageLogRepository } from '~/features/usageLogs/usageLog.repository'

export interface IUsageLogService {
  incrementUsageLog: (
    apiKeyId: string,
    endpoint: string,
    date: string,
  ) => Promise<void>
}

export class UsageLogService implements IUsageLogService {
  constructor(private usageLogRepository: IUsageLogRepository) {}

  async incrementUsageLog(apiKeyId: string, endpoint: string, date: string) {
    await this.usageLogRepository.incrementUsageLog(apiKeyId, endpoint, date)
  }
}
