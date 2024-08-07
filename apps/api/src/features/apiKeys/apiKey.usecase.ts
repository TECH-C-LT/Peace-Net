import { UnauthorizedError } from '@peace-net/shared/core/error'
import { failure, Result, success } from '@peace-net/shared/utils/result'

import { IApiKeyService } from './apiKey.service'
import type { VerifyApiKeyInput, VerifyApiKeyOutput } from './apiKey.type'

export interface IApiKeyUsecase {
  verifyApiKey(input: VerifyApiKeyInput): Promise<Result<VerifyApiKeyOutput>>
}

export class ApiKeyUsecase implements IApiKeyUsecase {
  constructor(private apiKeyService: IApiKeyService) {}

  async verifyApiKey(
    input: VerifyApiKeyInput,
  ): Promise<Result<VerifyApiKeyOutput>> {
    try {
      const result = await this.apiKeyService.verifyApiKey(input)

      if (!result.isValid) {
        throw new UnauthorizedError(result.error)
      }

      return success(result)
    } catch (error) {
      return failure(error)
    }
  }
}
