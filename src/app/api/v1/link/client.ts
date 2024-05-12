import { z } from 'zod';

export interface PostLinkDataZod {
  originalUrl: string,
  shortCode?: string,
  metadata?: any,
  userId?: string
}

export const postLinkDataZod = z.object({
  originalUrl: z.string().url(),
  shortCode: z.string().regex(/^[a-zA-Z0-9_-]+$/, {
    message: 'Short code must only contain alphanumeric characters, underscores, or hyphens.',
  }).optional(),
  metadata: z.any().optional()
})