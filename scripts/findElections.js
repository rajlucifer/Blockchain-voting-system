const { ethers } = require("hardhat");

async function main() {
  console.log("🔍 Finding all elections...");
  
  const [admin] = await ethers.getSigners();
  console.log("Admin address:", admin.address);
  
  const Factory = await ethers.getContractFactory("ElectionFactory");
  const factory = Factory.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  
  // Try different methods to get elections
  console.log("\n📋 Method 1: getAllElections()");
  try {
    const elections = await factory.getAllElections();
    console.log("Found elections:", elections);
  } catch (error) {
    console.log("getAllElections failed:", error.message);
  }
  
  console.log("\n📋 Method 2: getElectionsCount()");
  try {
    const count = await factory.getElectionsCount();
    console.log("Total elections:", count.toString());
    
    for (let i = 0; i < count; i++) {
      try {
        const address = await factory.elections(i);
        console.log(`Election ${i}: ${address}`);
      } catch (e) {
        console.log(`Could not get election ${i}`);
      }
    }
  } catch (error) {
    console.log("getElectionsCount failed:", error.message);
  }
  
  console.log("\n📋 Method 3: Check recent transaction");
  try {
    // Get the latest block to find recent elections
    const provider = ethers.provider;
    const blockNumber = await provider.getBlockNumber();
    console.log("Current block:", blockNumber);
    
    // Check last 10 blocks for ElectionCreated events
    for (let i = blockNumber; i > blockNumber - 10; i--) {
      const block = await provider.getBlock(i);
      if (block && block.transactions) {
        for (const txHash of block.transactions) {
          const tx = await provider.getTransaction(txHash);
          if (tx && tx.to && tx.to.toLowerCase() === factory.target.toLowerCase()) {
            console.log("Found factory transaction:", txHash);
          }
        }
      }
    }
  } catch (error) {
    console.log("Transaction check failed:", error.message);
  }
}

main().catch(console.error);