'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { ButtonLink } from '../../../components/Button/ButtonLink/component.tsx';
import { useWalletProvider } from '../../../providers/index.ts';
import { RegnSchema } from '../../../schemas/index.ts';
import { buildRegisterField } from '../../../utils/forms.ts';
import { Button, Card, Input } from '../../../components/index.ts';
import { useToastAction } from '../../../utils/use_toast_action.ts';

import styles from './page.module.scss';
import { createTask } from './actions.ts';

const FormRegnSchema = RegnSchema.extend({
  signedPayload: z
    .string({ invalid_type_error: 'Invalid signed payload' })
    .regex(
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
      'Invalid base64 character'
    )
});

type IFormRegnSchema = z.infer<typeof FormRegnSchema>;

export const CreatePollForm = () => {
  const { wallet, requestDataSignature } = useWalletProvider();

  const {
    formState,
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    trigger
  } = useForm<IFormRegnSchema>({
    mode: 'onTouched',
    resolver: zodResolver(FormRegnSchema)
  });

  const registerField = buildRegisterField(register, formState, control);

  const onFormSubmit = handleSubmit(async (values) => {
    const response = await useToastAction(createTask, {
      progress: (t) => t.info('Creating regn'),
      error: (t, e) => t.error(`Unknown error while submitting regn: ${e}`)
    })(values);

    if (response?.errors.serverErrors) {
      if (response.errors.serverErrors.content.includes('InvalidEndSnapshot')) {
        toast.error(
          'Unable to create the regn, check the end snapshot ordinal, must be greater than the current snapshot',
          { autoClose: false }
        );
        return;
      }
      toast.error(response.errors.serverErrors.content, { autoClose: false });
    }
  });

  const buildAndSignPayload = async () => {
    const validatedValues = FormRegnSchema.safeParse(getValues());

    if (!validatedValues.data) {
      throw new Error('Inconsistency Error');
    }

    const values = validatedValues.data;

    console.log(values);

    const basePayload = {
      CreatePoll: {
        name: values.name,
        owner: values.owner,
        pollOptions: values.options,
        startSnapshotOrdinal: values.startSnapshotOrdinal,
        endSnapshotOrdinal: values.endSnapshotOrdinal
      }
    };

    const { signature, pub } = await useToastAction(requestDataSignature, {
      progress: (t) =>
        t.info('Requesting wallet signature', {
          autoClose: false
        }),
      success: (t) => t.success('Payload signed'),
      error: (t, e) =>
        t.error(`An error ocurred while signing the payload [${e}]`)
    })(basePayload);

    const uncompressedPublicKey = pub.length === 128 ? '04' + pub : pub;

    const fullPayload = {
      value: {
        ...basePayload
      },
      proofs: [{ id: uncompressedPublicKey.substring(2), signature }]
    };

    return btoa(JSON.stringify(fullPayload));
  };

  useEffect(() => {
    setValue('owner', wallet.active ? wallet.account : '', {
      shouldTouch: true,
      shouldDirty: true
    });
  }, [wallet.active && wallet.account]);

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name !== 'signedPayload') {
        setValue('signedPayload', '', {
          shouldTouch: true,
          shouldDirty: true
        });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <form className={styles.content} onSubmit={onFormSubmit}>
      <div className={styles.cards}>
        <Card variants={['full-width', 'padding-m']} header={'Tax Registration Form'}>
          <Input
            label="Name"
            description="Maximum of 128 characters"
            placeholder="Tax registration name"
            {...registerField('name')}
          />
          <Input
            label="Owner"
            description="Owner DAG address"
            readOnly
            {...registerField('owner')}
          />
          <Input
            type="add-options"
            label="Options"
            description="Tax registration options"
            {...registerField('options')}
          />
          <Input
            label="Start snapshot ordinal"
            description="When this form should start"
            placeholder="Ordinal number"
            {...registerField('startSnapshotOrdinal')}
          />
          <Input
            label="End snapshot ordinal"
            description="When this form should end"
            placeholder="Ordinal number"
            {...registerField('endSnapshotOrdinal')}
          />
          <Input
            label="Signature"
            description="Your signature created with your wallet"
            readOnly
            {...registerField('signedPayload')}
          />
          <Button
            type="button"
            variants={['primary']}
            onClick={async () => {
              setValue('signedPayload', await buildAndSignPayload(), {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true
              });
            }}
          >
            Sign with your wallet
          </Button>
        </Card>
      </div>
      <Card variants={['padding-sm']}>
        <ButtonLink
          href={'/regns'}
          variants={['primary', 'outline-fade', 'centered']}
        >
          Cancel
        </ButtonLink>
        <Button
          variants={['primary', 'centered', !formState.isValid && 'disabled']}
          type="submit"
          disabled={!formState.isValid}
        >
          Create tax registration form
        </Button>
      </Card>
    </form>
  );
};
