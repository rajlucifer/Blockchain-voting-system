const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Blockchain Voting System", function () {
  let electionFactory;
  let election;
  let owner;
  let voter1;
  let voter2;
  let candidate1;
  let candidate2;

  beforeEach(async function () {
    [owner, voter1, voter2, candidate1, candidate2] = await ethers.getSigners();

    const ElectionFactory = await ethers.getContractFactory("ElectionFactory");
    electionFactory = await ElectionFactory.deploy();
    
    await electionFactory.waitForDeployment();

    // Create a new election
    const tx = await electionFactory.createElection("Test Election", 24);
    const receipt = await tx.wait();
    
    // Get the deployed election address from events
    const electionAddress = receipt.logs[0].args.electionAddress;
    const Election = await ethers.getContractFactory("Election");
    election = Election.attach(electionAddress);
  });

  describe("Election Creation", function () {
    it("Should create election with correct parameters", async function () {
      expect(await election.electionName()).to.equal("Test Election");
      expect(await election.admin()).to.equal(owner.address);
      expect(await election.electionEnded()).to.be.false;
    });
  });

  describe("Candidate Management", function () {
    it("Should add candidate", async function () {
      await election.addCandidate("Candidate 1", candidate1.address);
      
      const candidate = await election.getCandidate(1);
      expect(candidate.name).to.equal("Candidate 1");
      expect(candidate.candidateAddress).to.equal(candidate1.address);
      expect(candidate.voteCount).to.equal(0);
    });

    it("Should not allow non-admin to add candidate", async function () {
      await expect(
        election.connect(voter1).addCandidate("Candidate 1", candidate1.address)
      ).to.be.revertedWith("Only admin can perform this action");
    });
  });

  describe("Voter Registration", function () {
    it("Should register voter", async function () {
      await election.registerVoter(voter1.address);
      
      const voterStatus = await election.getVoterStatus(voter1.address);
      expect(voterStatus.registered).to.be.true;
      expect(voterStatus.voted).to.be.false;
    });

    it("Should not allow non-admin to register voters", async function () {
      await expect(
        election.connect(voter1).registerVoter(voter2.address)
      ).to.be.revertedWith("Only admin can perform this action");
    });
  });

  describe("Voting", function () {
    beforeEach(async function () {
      await election.addCandidate("Candidate 1", candidate1.address);
      await election.addCandidate("Candidate 2", candidate2.address);
      await election.registerVoter(voter1.address);
      await election.registerVoter(voter2.address);
    });

    it("Should allow registered voter to vote", async function () {
      await election.connect(voter1).vote(1);
      
      const voterStatus = await election.getVoterStatus(voter1.address);
      expect(voterStatus.voted).to.be.true;
      expect(voterStatus.votedFor).to.equal(1);
      
      const candidate = await election.getCandidate(1);
      expect(candidate.voteCount).to.equal(1);
    });

    it("Should not allow unregistered voter to vote", async function () {
      const [,,,unregisteredVoter] = await ethers.getSigners();
      await expect(
        election.connect(unregisteredVoter).vote(1)
      ).to.be.revertedWith("Voter not registered");
    });

    it("Should not allow double voting", async function () {
      await election.connect(voter1).vote(1);
      await expect(
        election.connect(voter1).vote(2)
      ).to.be.revertedWith("Already voted");
    });
  });

  describe("Election Management", function () {
    beforeEach(async function () {
      await election.addCandidate("Candidate 1", candidate1.address);
      await election.addCandidate("Candidate 2", candidate2.address);
      await election.registerVoter(voter1.address);
      await election.registerVoter(voter2.address);
      
      await election.connect(voter1).vote(1);
      await election.connect(voter2).vote(2);
    });

    it("Should end election", async function () {
      // Fast forward time
      await ethers.provider.send("evm_increaseTime", [25 * 60 * 60]); // 25 hours
      await ethers.provider.send("evm_mine");
      
      await election.endElection();
      expect(await election.electionEnded()).to.be.true;
    });

    it("Should declare winner", async function () {
      // Fast forward time and end election
      await ethers.provider.send("evm_increaseTime", [25 * 60 * 60]);
      await ethers.provider.send("evm_mine");
      
      await election.endElection();
      await election.declareWinner();
      
      const winner = await election.winner();
      expect(winner).to.equal(candidate2.address); // Candidate 2 has more votes
    });
  });
});