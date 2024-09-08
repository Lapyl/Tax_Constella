'use client';

import { useEffect, useState } from 'react';

/* eslint-disable react/no-unescaped-entities */
import { Card, PageFrame, RegnCard } from '../../components';
import { ButtonLink } from '../../components/Button/ButtonLink/component';
import { IRegn } from '../../types';

import styles from './page.module.scss';
import { getRegns } from './actions';

export default function HomePage() {
  const [regns, setRegns] = useState<[string, IRegn][]>([]);

  const fetchRegns = async () => {
    setRegns(await getRegns());
  };

  useEffect(() => {
    const iid = window.setInterval(fetchRegns, 5 * 1000);
    fetchRegns();
    return () => {
      window.clearInterval(iid);
    };
  }, []);

  return (
    <PageFrame variants={['noSidebarMargin']}>
      <section className={styles.introCard}>
        <Card
          header="Metagraph Example of Tax Registrations"
          variants={['padding-m']}
        >
          This example demonstrates:
          <ul>
            <li>Usage of a metagraph as a web server backend</li>
            <li>
              Integration of Stargazer wallet to securely sign and send custom
              data updates to the metagraph
            </li>
            <li>
              Usage of the metagraph+wallet system for taxpayers' tax
              registrations with government tax agencies
            </li>
          </ul>
          In this example, tax agencies generate tax registration forms,
          and taxpayers fill out the forms. Tax agencies and taxpayers are required to have their Stargazer
          wallets, and taxpayers may be required to have tokens. The readme.md file explains how to add tokens to a wallet.
          <br />
          <br />
          The metagraph's state can be queried through the following links:
          <ul>
            <li>
              <a
                href="http://taxai.us:9201/snapshots/latest/combined"
                target="_blank"
              >
                The latest snapshot data (accessible externally)
              </a>
            </li>
            <li>
              <a
                href="http://taxai.us:9201/data-application/regns"
                target="_blank"
              >
                A custom GET endpoint, exposing all tax registrations through
                the metagraph's Calculated State (accessible externally)
              </a>
            </li>
            <li>
              <a
                href="http://localhost:9200/snapshots/latest/combined"
                target="_blank"
              >
                The latest snapshot data (accessible locally)
              </a>
            </li>
            <li>
              <a
                href="http://localhost:9200/data-application/regns"
                target="_blank"
              >
                A custom GET endpoint, exposing all tax registrations through
                the metagraph's Calculated State (accessible locally)
              </a>
            </li>
          </ul>
          <div className={styles.createTasks}>
            {regns.length === 0 && (
              <span>There is no tax registration form yet.</span>
            )}
            <ButtonLink variants={['primary']} href={'/regns/create'}>
              Create a tax registration form.
            </ButtonLink>
          </div>
        </Card>
      </section>
      <section className={styles.main}>
        {regns.map(([id, regn]) => (
          <RegnCard key={id} regn={regn} />
        ))}
      </section>
    </PageFrame>
  );
}
