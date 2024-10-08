import { z } from 'zod';

export const PollSchema = z.object({
  name: z
    .string({ invalid_type_error: 'Invalid xax registration form name' })
    .min(1, 'Must contain at least 1 character(s)')
    .max(128, { message: 'Must contain at most 128 character(s)' }),
  owner: z
    .string({ invalid_type_error: 'Invalid owner address' })
    .min(1, 'Must contain at least 1 character(s)')
    .max(128, { message: 'Must contain at most 128 character(s)' }),
  options: z
    .array(
      z
        .string({ invalid_type_error: 'Invalid tax registartion option' })
        .min(1, 'Must contain at least 1 character(s)')
        .max(256, { message: 'Must contain at most 256 character(s)' }),
      {
        invalid_type_error: 'Invalid location options'
      }
    )
    .nonempty({ message: 'Invalid location options, must specify at least one' }),
  startSnapshotOrdinal: z.coerce
    .number({
      invalid_type_error: 'Invalid tax registration start'
    })
    .max(1e9, { message: 'Snapshot must not be larger than 1E9' }),
  endSnapshotOrdinal: z.coerce
    .number({
      invalid_type_error: 'Invalid tax registration form end'
    })
    .max(1e9, { message: 'Snapshot must not be larger than 1E9' })
});
