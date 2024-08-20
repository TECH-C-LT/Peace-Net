import { z } from 'zod'
import { modelsSchema } from '../schemas/model'

export type Models = z.infer<typeof modelsSchema>
