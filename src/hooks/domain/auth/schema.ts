import * as z from 'zod';

export const sessionSchema = z.object({
  user: z.object({
    id: z.number(),
    email: z.string().email(),
  }),
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresAt: z.iso.datetime({
    offset: true,
  }),
});

export type Session = z.infer<typeof sessionSchema>;
