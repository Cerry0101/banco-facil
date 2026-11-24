import React from 'react';
import { Page } from '../components/ui';
import { BankCard } from '../components/BankCard';
import { banks } from '../data/tutorials';
export default function Banks() { return <Page title="Escolha seu banco">{banks.map(bank => <BankCard key={bank.id} bank={bank} />)}</Page>; }


