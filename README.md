# Web-Based-Crypto-Wallet

Web-Based-Crypto-Wallet is a comprehensive multi-blockchain wallet that allows users to interact with both the Ethereum and Solana blockchains seamlessly. With this wallet, users can generate a mnemonic seed phrase, create multiple wallets, check their wallet balances, and even manage their wallets through a clean and intuitive interface.

## Features

- **Mnemonic Generation:** Generate a 12-word mnemonic seed phrase for secure wallet creation.
- **Multi-Wallet Support:** Create multiple wallets under a single mnemonic, each with its own address and private key.
- **Balance Checking:** Easily check the balance of each wallet in ETH or SOL.
- **Clean UI:** A clean and responsive interface designed for ease of use.
- **Multi-Blockchain Support:** Seamlessly interact with both Ethereum and Solana blockchains.

## Tech Stack

- **Frontend:** React, TypeScript
- **Blockchain Interaction:** ethers.js (for Ethereum), @solana/web3.js (for Solana)
- **API:** Alchemy API for blockchain data
- **Styling:** MUI (Material-UI)

## Installation

**Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Web-Based-Crypto-Wallet.git
   cd Web-Based-Crypto-Wallet
  ```
### Install dependencies:

```bash
npm install
```


### Set up environment variables:

1. Create a `.env` file in the root directory.
2. Add your Alchemy API keys for Ethereum and Solana to the `.env` file:

```plaintext
VITE_APP_ETHEREUM_API_URL=https://eth-mainnet.g.alchemy.com/v2/your-api-key
VITE_APP_SOLANA_API_URL=https://solana-mainnet.g.alchemy.com/v2/your-api-key
```

## Run the project

```bash
npm run dev
```

### Usage

- **Generate a Seed Phrase**: Click the "Generate Seed Phrase" button to create a new mnemonic.
- **Create a Wallet**: Use the generated seed phrase to create a new wallet.
- **Check Balance**: Select a wallet to view its balance in ETH or SOL.
- **Send Transactions**: Click "Send" to open the transaction form, enter the recipient's address, and the amount to send.

### Future Enhancements

- **Transaction History**: Display a list of past transactions for each wallet.
- **Wallet Import**: Import existing wallets using private keys or JSON files.

### Acknowledgments

- **ethers.js**: For providing an easy-to-use library for interacting with the Ethereum blockchain.
- **@solana/web3.js**: For offering a robust toolset for Solana blockchain interaction.
- **Alchemy**: For offering reliable APIs to access blockchain data.
