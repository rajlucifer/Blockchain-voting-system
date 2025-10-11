const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Creating a working election...");
  
  const [admin] = await ethers.getSigners();
  console.log("Admin:", admin.address);
  
  // Get the newly deployed factory
  const Factory = await ethers.getContractFactory("ElectionFactory");
  const factory = Factory.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  
  console.log("Factory address:", factory.target);
  
  // Create election
  console.log("Creating election...");
  const tx = await factory.createElection("Working Test Election", 24);
  console.log("Transaction sent:", tx.hash);
  
  const receipt = await tx.wait();
  console.log("✅ Transaction confirmed!");
  
  // Get the election address from events
  let electionAddress = null;
  if (receipt.logs && receipt.logs.length > 0) {
    for (const log of receipt.logs) {
      try {
        const parsedLog = factory.interface.parseLog(log);
        if (parsedLog && parsedLog.name === 'ElectionCreated') {
          electionAddress = parsedLog.args.electionAddress;
          console.log("🎯 ELECTION CREATED SUCCESSFULLY!");
          console.log("📍 ELECTION ADDRESS:", electionAddress);
          console.log("📝 Election Name:", parsedLog.args.name);
          console.log("👑 Admin:", parsedLog.args.admin);
          break;
        }
      } catch (e) {
        // Continue to next log
      }
    }
  }
  
  if (!electionAddress) {
    console.log("❌ Could not find election address in logs, trying alternative method...");
    
    // Try to get from getAllElections
    try {
      const elections = await factory.getAllElections();
      if (elections.length > 0) {
        electionAddress = elections[elections.length - 1];
        console.log("📍 ELECTION ADDRESS (from getAllElections):", electionAddress);
      }
    } catch (error) {
      console.log("getAllElections failed:", error.message);
    }
  }
  
  if (electionAddress) {
    console.log("\n🎉 SUCCESS! Use this election address in your Admin Panel:");
    console.log("ELECTION ADDRESS:", electionAddress);
    console.log("\nTest candidate data:");
    console.log("Candidate Name: Alice Johnson");
    console.log("Candidate Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
  } else {
    console.log("❌ Failed to get election address");
  }
}

main().catch(console.error);