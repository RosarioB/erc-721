# erc-721
Various examples of ERC-721 tokens

Set up the project:

1. Clone the repository
2. In the project root create a file .env and add:
   
    `PRIVATE_KEY="your_private_key"`
   
    `INFURA_SEPOLIA_ENDPOINT="your_infura_sepolia_api_key"`
4.  Install the project dependencies: `npm install`
5.  Compile the contract: `npx hardhat compile`
6.  Test the contract: `npx hardhat test test/FootballPlayers.ts --typecheck`
7.  Deploy the contract to Sepolia: ` npx hardhat ignition deploy ignition/modules/FootballPlayers.ts --network sepolia`