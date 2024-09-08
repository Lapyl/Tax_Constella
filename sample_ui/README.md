# User Interface for Metagraph Example of Tax Registrations

## Description

This "User Interface for Metagraph Example of Tax Registrations" is built using Next.js 14 and npm.

This metagraph example demonstrates:

<ul>
<li>Usage of a metagraph as a web server backend</li>
<li>Integration of Stargazer wallet to securely sign and send custom data updates to the metagraph</li>
<li>Usage of the metagraph+wallet system for taxpayer's tax registrations with a government tax authority</li>
</ul>

In this metagrpah example, the tax authority generates tax registration forms, and taxpayers submit fill out the forms.

The authority and taxpayers are required to have their Stargazer wallets. Taxpayers may be required to have tokens as prescribed by the tax authority.

## Features

- Create new tax registration forms
- Fill out existing tax registration forms
- Authentication via Stargazer wallet
- Check wallet balance before filling out a form

## Prerequisites for this UI app

- Node.js (v18 or higher)
- npm (v9 or higher)
- Stargazer wallet
- Stargazet Wallet Extension for Google Chrome

## Usage

### Metagraph

- Start Docker.
- If Docker does not have Metagraph images, from Euclid SDK, run:

```sh
scripts/hydra build
```

- From Euclid SDK, run:

```sh
scripts/hydra start-genesis
```

- Confirm that the metagraphs are running.

### This UI app

- Install dependencies:

```sh
npm install
```

- start the development server:

```sh
npm run dev
```

- Open http://localhost:9930 with your browser to see the result.

### Stargazer wallet

- Get a Stargazer wallet, if not already done.
- If using Google Chrome, install Stargazer Wallet Extension.

#### Token

- Add the metagraph as a custom Constellation token in your wallet.
- Open Stargazer Wallet in Chrome; scroll to the bottom; click 'Manage tokens'; and click '+' in the upper right of the screen to add a custom token.
- Use the following details for adding a token.
  -- Network: Constellation
  -- L1 endpoint: metagraph-node-1 Currency L1 (http://localhost:9300)
  -- L0 endpoint: metagraph-node-1 Metagraph L0 (http://localhost:9200)
  -- Metagraph ID: metagraph ID from your output
  -- Token name: Anything you want
  -- Token symbol: Anything you want.

#### Genesis file

To set up a wallet with balance, you can modify the genesis file in your local Euclid project located at `source/metagraph-l0/genesis/genesis.csv`.

The file's first column indicates the target address for funds, the second column indicates the token balance to allocate for the wallet. This balance is denominated in datum, so the value added to the file should 1e8 times larger than number of tokens you want to create (e.g. 55 tokens would be 5500000000).

Rebuild and restart your metagraph from genesis to see the balance reflected in your wallet.

## To Do

The tax registration form needs additional input fields.
