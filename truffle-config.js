const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    // development: {
    //   host: "127.0.0.1",
    //   port: 7545,
    //   network_id: "*" // Match any network id
    // },
    sepolia: {
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_API),
      network_id: 11155111, // Sepolia's id
      gas: 5500000, // Sepolia has a lower block limit than mainnet
      confirmations: 2, // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
      networkCheckTimeout: 1000000,
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "0.8.9",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
