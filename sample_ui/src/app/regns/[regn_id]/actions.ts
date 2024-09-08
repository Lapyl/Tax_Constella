'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { AprvSchema } from '../../../schemas';
import { MetagraphBaseURLs } from '../../../consts';

const CastAprvSchema = AprvSchema.extend({
  signedPayload: z
    .string({ invalid_type_error: 'Invalid signed payload' })
    .regex(
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
      'Invalid base64 character'
    )
});

type ICastAprvSchema = z.infer<typeof CastAprvSchema>;
type IAPIResponse = { hash: string };

export const castAprv = async (values: ICastAprvSchema) => {
  const validatedFields = CastAprvSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: { fieldErrors: validatedFields.error.flatten().fieldErrors }
    };
  }

  const decodedSignedPayload = JSON.parse(
    Buffer.from(validatedFields.data.signedPayload, 'base64').toString()
  );

  const response = await fetch(MetagraphBaseURLs.dataL1 + '/data', {
    method: 'post',
    body: JSON.stringify(decodedSignedPayload)
  });

  if (response.status !== 200) {
    return {
      errors: {
        serverErrors: {
          status: response.status,
          content: await response.text()
        }
      }
    };
  }

  const responseData: IAPIResponse = await response.json();

  console.log(responseData);

  revalidateTag('regns');
  revalidatePath('/regns');
  redirect(`/regns`);

  return undefined;
};
