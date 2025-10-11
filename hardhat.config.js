// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: {
//     version: "0.8.18",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   },
//   networks: {
//     localhost: {
//       url: "http://127.0.0.1:8545"
//     },
//     sepolia: {
//       url: process.env.RPC_URL || "",
//       accounts: process.env.ADMIN_PRIVATE_KEY ? [process.env.ADMIN_PRIVATE_KEY] : []
//     }
//   },
//   paths: {
//     artifacts: "./frontend/src/artifacts"
//   }
// };


require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: process.env.RPC_URL || "",
      accounts: process.env.ADMIN_PRIVATE_KEY ? [process.env.ADMIN_PRIVATE_KEY] : []
    }
  },
  paths: {
    artifacts: "./frontend/src/artifacts"
  }
};