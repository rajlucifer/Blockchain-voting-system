// const { ethers } = require("hardhat");

// async function main() {
//   console.log("Deploying ElectionFactory contract...");
  
//   const ElectionFactory = await ethers.getContractFactory("ElectionFactory");
//   const electionFactory = await ElectionFactory.deploy();
  
//   await electionFactory.waitForDeployment();
//   const factoryAddress = await electionFactory.getAddress();
  
//   console.log("ElectionFactory deployed to:", factoryAddress);
  
//   // Save deployment info
//   const fs = require('fs');
//   const deployments = {
//     ElectionFactory: factoryAddress,
//     network: network.name,
//     timestamp: new Date().toISOString()
//   };
  
//   fs.writeFileSync('./deployments.json', JSON.stringify(deployments, null, 2));
//   console.log("Deployment info saved to deployments.json");
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });



const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying ElectionFactory contract...");
  
  const ElectionFactory = await ethers.getContractFactory("ElectionFactory");
  const electionFactory = await ElectionFactory.deploy();
  
  await electionFactory.waitForDeployment();
  const factoryAddress = await electionFactory.getAddress();
  
  console.log("ElectionFactory deployed to:", factoryAddress);
  
  // Save deployment info
  const fs = require('fs');
  const deployments = {
    ElectionFactory: factoryAddress,
    network: 'localhost',
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync('./deployments.json', JSON.stringify(deployments, null, 2));
  console.log("Deployment info saved to deployments.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });