'use client';

import { useEffect, useState } from 'react';

/* eslint-disable react/no-unescaped-entities */
import { Card, PageFrame, PollCard } from '../../components';
import { ButtonLink } from '../../components/Button/ButtonLink/component';
import { IPoll } from '../../types';

import styles from './page.module.scss';
import { getPolls } from './actions';

export default function HomePage() {
  const [polls, setPolls] = useState<[string, IPoll][]>([]);

  const fetchPolls = async () => {
    setPolls(await getPolls());
  };

  useEffect(() => {
    const iid = window.setInterval(fetchPolls, 5 * 1000);
    fetchPolls();
    return () => {
      window.clearInterval(iid);
    };
  }, []);

  return (
    <PageFrame variants={['noSidebarMargin']}>
      <section className={styles.introCard}>
        <Card
          header="Tax Registration Metagraph Example"
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
          <div className={styles.createPolls}>
            {polls.length === 0 && <span>No tax registration form yet, create one!</span>}
            <ButtonLink variants={['primary']} href={'/polls/create'}>
              Create tax registration form.
            </ButtonLink>
          </div>
        </Card>
      </section>
      <section className={styles.main}>
        {polls.map(([id, poll]) => (
          <PollCard key={id} poll={poll} />
        ))}
      </section>
    </PageFrame>
  );
}
