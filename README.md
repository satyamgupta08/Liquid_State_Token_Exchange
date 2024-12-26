# P-SOL - Liquid Staking Token for Solana

## Overview

**P-SOL** is a project designed to facilitate **liquid staking** on the Solana blockchain. With P-SOL, you can stake your Solana (SOL) and receive **P-SOL tokens** in return. These tokens represent your staked SOL and can be redeemed for an equivalent amount of SOL at any time, based on the current staking rewards and token value. P-SOL allows you to participate in staking without locking up your SOL, giving you both staking rewards and the flexibility to use your tokens in DeFi or other Solana-based applications.

## How it Works

- **Staking SOL**: When you stake SOL through our platform, you receive P-SOL tokens in exchange. The number of P-SOL tokens you receive depends on the current price of P-SOL, which reflects the value of the staked SOL plus accumulated rewards.
  
- **Unstaking P-SOL**: At any point, you can choose to unstake your P-SOL tokens. Upon unstaking, you will receive the equivalent amount of SOL based on the current exchange rate of P-SOL to SOL, including any rewards accrued during the staking period.

## Liquid Staking Overview

Liquid staking is a more flexible alternative to traditional staking. Normally, when you stake your tokens, they are locked up, and you cannot access or use them until you unstake them after a specified period. Liquid staking solves this problem by issuing a token that represents your staked assets, in this case, **P-SOL** for staked Solana.

### Benefits of Liquid Staking:
1. **Liquidity**: You can freely trade or use your P-SOL tokens in decentralized finance (DeFi) while still earning staking rewards.
2. **Unlock Staked Assets**: With P-SOL, your staked SOL is not locked. You can sell, swap, or provide liquidity using your P-SOL tokens.
3. **Earn Rewards**: You continue to earn staking rewards as long as you hold P-SOL, even when those tokens are used in other protocols.

### Reference: mSOL (Marinade SOL)
A well-known example of a liquid staking token is **mSOL** by Marinade Finance. When you stake SOL on Marinade, you receive mSOL tokens that grow in value over time as staking rewards accumulate. These tokens can be used across various DeFi platforms while still representing your staked SOL.

P-SOL operates in a similar manner:
- You receive P-SOL tokens when you stake SOL.
- The value of P-SOL increases as staking rewards are accrued.
- You can always redeem your P-SOL for SOL at the current exchange rate, just like how mSOL can be exchanged back for SOL.

## How to Use

1. **Connect your Solana Wallet**: Ensure your wallet is connected to Devnet.
2. **Stake SOL**: Enter the amount of SOL you wish to stake, and you will receive P-SOL tokens equivalent to the staked SOL at the current price.
3. **Unstake P-SOL**: When you want to retrieve your SOL, simply provide your P-SOL tokens, and you will receive the equivalent amount of SOL in return.
4. **Use in DeFi**: While holding P-SOL, you can participate in DeFi, lending, or trading, while continuing to earn staking rewards.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/psg-19/Liquid_State_Token_Exchange.git
   cd .\Liquid_State_Token_Exchange\
   ```

2. Install dependencies:
   ```bash
   cd .\frontend\
   npm install --force
   
   ```
3. Create .env file in root directory and add variable 
```
VITE_API_KEY=http://localhost:3000
```
4. Start the Frontend:
   ```bash
   npm run dev
   ```
5. Now open another terminal and make sure you are in server directory
6.  Install dependencies:
   ```bash
 
   npm install --force
   
   ```
7. Make .env file in root directory of server
```
PRIVATE_KEY=<YOUR_WALLET_PRIVATE_KEY here>
```

8. Open the project in your browser:
   ```
   http://localhost:5173/
   ```

## Technologies Used

- **Solana**: Blockchain for staking SOL.
- **Helius Webhook**: Constantly monitors wallet transactions of the Owner of P-SOL minting authority to provide realtime data from blockchain.
- **React**: Front-end framework to build the user interface.
- **Tailwind CSS**: For responsive and modern UI styling.
- **@solana/web3.js**: Solana SDK for interacting with the blockchain.
- **@solana/spl-token:** Solana's token program for creating, minting, and managing SPL tokens (like P-SOL).
- **axios**: For handling API requests.

## Future Enhancements

- Support for Mainnet.
- Integration with DeFi platforms.
- Improved staking analytics.
   
