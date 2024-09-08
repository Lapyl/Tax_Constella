import { z } from 'zod';

export const AprvSchema = z.object({
  regnId: z
    .string({ invalid_type_error: 'Invalid regn id' })
    .min(1, 'Must contain at least 1 character(s)')
    .max(128, { message: 'Must contain at most 128 character(s)' }),
  address: z
    .string({ invalid_type_error: 'Invalid aprvr address' })
    .min(1, 'Must contain at least 1 character(s)')
    .max(128, { message: 'Must contain at most 128 character(s)' }),
  option: z
    .string({ invalid_type_error: 'Invalid aprv option' })
    .min(1, 'Must contain at least 1 character(s)')
    .max(128, { message: 'Must contain at most 128 character(s)' })
});
