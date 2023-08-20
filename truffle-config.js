const HDWalletProvider = require("@truffle/hdwallet-provider");

const infuraProjectId = "your-infura-project-id";
const privateKey = "your-private-key";

module.exports = {
  networks: {
    // development: {
    //   host: "127.0.0.1",
    //   port: 7545,
    //   network_id: "*" // Match any network id
    // },
    goerli: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [privateKey],
          providerOrUrl: `https://goerli.infura.io/v3/${infuraProjectId}`,
          numberOfAddresses: 1,
        }),
      network_id: 5,
      gas: 5500000,
      timeoutBlocks: 200,
      skipDryRun: true,
      networkCheckTimeout: 1000000,
      UV_THREADPOOL_SIZE: 20,
    },
  },
  contracts_directory: "./contracts/",
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
