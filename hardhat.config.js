/** @type import('hardhat/config').HardhatUserConfig */

//const { network } = require('hardhat');


require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")

const ALCHEMY_API_KEY = "3P9omLdolHyp5-RMG1Lh100p6Lp1elEp";
const SEPOLIA_PRIVATE_KEY = "56ed925660b0c0e84a39c3a8a9d9ce663254b4c2c5858bdf4b4be0acf5682ae7";
module.exports = {
  solidity: "0.8.18",
  paths: {
    tests: "./tests"
  },

  networks : {
    sepolia : {
      url : `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts : [`${SEPOLIA_PRIVATE_KEY}`],  
    }
  },

  etherscan : {
    apiKey : {
      sepolia : "4YEAB3WYC2V2SPR3IM4YAGXKZ1IGM97AFZ"
    }
  }




};
