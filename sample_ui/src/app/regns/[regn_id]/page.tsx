import { notFound } from 'next/navigation';

import { PageFrame, RequiredWallet } from '../../../components';
import { MetagraphBaseURLs } from '../../../consts';
import { IRegn } from '../../../types';

import { CastAprvForm } from './form';
import styles from './page.module.scss';

export default async function CastAprvPage({
  params
}: {
  params: { regn_id: string };
}) {
  const response = await fetch(
    MetagraphBaseURLs.metagraphL0 + `/data-application/regns/${params.regn_id}`,
    { cache: 'no-store' }
  );

  if (response.status === 404) {
    notFound();
  }

  if (response.status !== 200) {
    throw new Error(
      JSON.stringify(
        {
          errors: { serverErrors: [response.status, await response.text()] }
        },
        null,
        2
      )
    );
  }

  const regn: IRegn = await response.json();

  return (
    <PageFrame>
      <RequiredWallet>
        <section className={styles.main}>
          <CastAprvForm regn={regn} />
        </section>
      </RequiredWallet>
    </PageFrame>
  );
}
