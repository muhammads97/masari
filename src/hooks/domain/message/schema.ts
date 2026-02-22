import * as z from 'zod';

export const messageSchema = z.object({
  sentAt: z.iso.datetime({
    offset: true,
  }),
  type: z.enum(['IMG', 'TXT']),
  value: z.string(),
});

export const messagesSchema = z.array(messageSchema);

export type Message = z.infer<typeof messageSchema>;
