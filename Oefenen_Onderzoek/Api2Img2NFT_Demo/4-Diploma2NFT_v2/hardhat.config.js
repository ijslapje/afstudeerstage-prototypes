require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia:{
      url: "https://mainnet.infura.io/v3/c3d17021f3ad45099c71c6cd7d3a2eee",
      accounts: ["e89dc5878ba91ed1f90bf490065b8b786df59b212fdcda076aef1d2641e17ba0"]
    }
  }
};
