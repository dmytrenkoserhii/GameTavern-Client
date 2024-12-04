import { z } from 'zod';

export const listFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});
