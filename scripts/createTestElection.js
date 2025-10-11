const { ethers } = require("hardhat");

async function main() {
  console.log("Creating test election...");
  
  const [admin] = await ethers.getSigners();
  console.log("Admin:", admin.address);
  
  const Factory = await ethers.getContractFactory("ElectionFactory");
  const factory = Factory.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  
  // Create election
  const tx = await factory.createElection("Test Student Election", 24);
  const receipt = await tx.wait();
  
  console.log("✅ Election created! Transaction:", receipt.hash);
  
  // Get election address from events
  for (const log of receipt.logs) {
    try {
      const parsedLog = factory.interface.parseLog(log);
      if (parsedLog.name === 'ElectionCreated') {
        console.log("🎯 ELECTION ADDRESS:", parsedLog.args.electionAddress);
        break;
      }
    } catch (e) {}
  }
}

main().catch(console.error);