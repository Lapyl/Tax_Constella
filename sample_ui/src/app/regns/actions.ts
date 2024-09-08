'use server';

import { MetagraphBaseURLs } from '../../consts';
import { IRegn } from '../../types';

export const getRegns = async () => {
  const regns: [string, IRegn][] = [];

  try {
    const response = await fetch(
      MetagraphBaseURLs.metagraphL0 + '/data-application/regns',
      { cache: 'no-store' }
    );

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

    regns.push(...(await response.json()));
  } catch (e) {
    console.log(e);
  }

  return regns;
};
