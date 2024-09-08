'use client';

import Blockies from 'react-blockies';

import { IRegn } from '../../types';
import { shorten } from '../../utils';
import { Card } from '../Card/component';
import { ButtonLink } from '../Button/ButtonLink/component';

import styles from './component.module.scss';

export type IRegnCardProps = {
  regn: IRegn;
};

export const RegnCard = ({ regn }: IRegnCardProps) => {
  const resultsTotal = Object.values(regn.result).reduce(
    (pv, aprvs) => pv + aprvs,
    0
  );

  return (
    <Card
      className={{ body: styles.main, root: styles.root }}
      variants={['padding-m']}
      header={
        <span className={styles.header}>
          <span>Regn - {regn.name}</span>
          <span>{regn.status}</span>
        </span>
      }
    >
      <div className={styles.info}>
        <span className={styles.creator}>
          Creator:
          <Blockies
            seed={regn.owner}
            size={10}
            scale={2}
            className={styles.identicon}
          />{' '}
          - {shorten(regn.owner)}
        </span>
        <span>
          Start: {regn.startSnapshotOrdinal} / End: {regn.endSnapshotOrdinal}
        </span>
      </div>

      <div className={styles.options}>
        {Object.entries(regn.result).map(([option, aprvs]) => {
          const resultPercentage =
            resultsTotal === 0
              ? 0
              : Math.floor((aprvs / resultsTotal) * 100 * 100) / 100;
          return (
            <div className={styles.option} key={option}>
              <span className={styles.placeholder}>placeholder</span>
              <div
                className={styles.bar}
                style={{ width: `${resultPercentage}%` }}
              ></div>
              <div className={styles.content}>
                <span>
                  {option}
                  {aprvs !== 0 && ` (${aprvs / 1e8} vp)`}
                </span>
                {!!aprvs && <span>{resultPercentage}%</span>}
              </div>
            </div>
          );
        })}
      </div>
      <ButtonLink
        className={styles.buttonLink}
        variants={['secondary']}
        href={`/regns/${regn.id}`}
      >
        Cast your aprv
      </ButtonLink>
    </Card>
  );
};
