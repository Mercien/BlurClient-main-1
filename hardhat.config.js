import("@nomicfoundation/hardhat-toolbox");

// const privateKey = "Wallet Private key"; // my wallet private key polygon mumbai testnework
//  alchemy polygone mumbai testnet api key
// const INFURA_API_KEY_MUMBAI = "9cb128774f4b4f5797fc40a6ff71eded"; //Infura apikey
const INFURA_API_KEY_SEPOLIA = "3d89cda5bfd04ffd8628088fa37597bf"; //Infura apikey

module.exports = {
  solidity: "0.7.0;",
  //   networks: {
  //     hardhat: {},
  //     mumbai: {
  //       url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY_MUMBAI}`,
  //       accounts: [],
  //     },
  //   },
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY_SEPOLIA}`,
      accounts: [],
    },
  },
};
