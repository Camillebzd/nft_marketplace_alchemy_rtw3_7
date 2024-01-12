require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";
require('dotenv').config();
require("@nomicfoundation/hardhat-verify");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const PRIVATE_KEY =
  process.env.REACT_APP_PRIVATE_KEY ||
  "";

const ETHERLINK_RPC_URL =
  process.env.REACT_APP_API_URL ||
  "https://node.ghostnet.etherlink.com";

const NIGHTLY_RPC_URL =
  process.env.REACT_APP_API_URL_NIGHTLY ||
  "";

const ETHERLINK_API_KEY = 
  process.env.REACT_APP_ETHERLINK_API_KEY || 
  "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    etherlink: {
      chainId: 128123,
      url: ETHERLINK_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    nightly: {
      chainId: 20240109,
      url: NIGHTLY_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: {
      etherlink: ETHERLINK_API_KEY,
      nightly: ETHERLINK_API_KEY
    },
    customChains: [
      {
        network: "etherlink",
        chainId: 128123,
        urls: {
          // apiURL: "https://explorer.etherlink.com/api",
          apiURL: "https://testnet-explorer.etherlink.com/api",
          // browserURL: "https://explorer.etherlink.com"
          browserURL: "https://testnet-explorer.etherlink.com"
        }
      },
      {
        network: "nightly",
        chainId: 20240109,
        urls: {
          apiURL: "https://explorer.2024-01-09.etherlink-nightly.tzalpha.net/api",
          browserURL: "https://explorer.2024-01-09.etherlink-nightly.tzalpha.net"
        }
      }
    ]
  }
};