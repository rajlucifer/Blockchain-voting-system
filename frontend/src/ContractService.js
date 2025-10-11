// import { ethers } from 'ethers';

// const ELECTION_FACTORY_ABI = [
//     "function createElection(string _electionName, uint256 _durationInHours) external returns (address)",
//     "function getAllElections() external view returns (address[])",
//     "function getElectionsCount() external view returns (uint256)",
//     "event ElectionCreated(address indexed electionAddress, string name, address admin)"
// ];

// const ELECTION_ABI = [
//     // Admin functions
//     "function addCandidate(string memory _name, address _candidateAddress) external",
//     "function registerVoter(address _voter) external",
//     "function endElection() external",
//     "function declareWinner() external",
    
//     // Voting function
//     "function vote(uint256 _candidateId) external",
    
//     // View functions
//     "function electionName() external view returns (string memory)",
//     "function electionEnded() external view returns (bool)",
//     "function winner() external view returns (address)",
//     "function totalVotes() external view returns (uint256)",
//     "function candidatesCount() external view returns (uint256)",
//     "function admin() external view returns (address)",
//     "function startTime() external view returns (uint256)",
//     "function endTime() external view returns (uint256)",
    
//     // Candidate functions
//     "function getCandidate(uint256 _candidateId) external view returns (uint256, string memory, address, uint256)",
//     "function candidates(uint256) external view returns (uint256 id, string memory name, address candidateAddress, uint256 voteCount)",
    
//     // Voter functions
//     "function getVoterStatus(address _voter) external view returns (bool registered, bool voted, uint256 votedFor)",
//     "function voters(address) external view returns (bool registered, bool voted, uint256 votedFor)",
//     "function isElectionActive() external view returns (bool)",
    
//     // Events
//     "event CandidateAdded(uint256 candidateId, string name, address candidateAddress)",
//     "event VoterRegistered(address voter)",
//     "event VoteCast(address voter, uint256 candidateId)",
//     "event ElectionEnded()",
//     "event WinnerDeclared(address winner, string winnerName, uint256 voteCount)"
// ];

// class ContractService {
//     constructor() {
//         this.provider = null;
//         this.signer = null;
//         this.factory = null;
//         this.factoryAddress = import.meta.env.VITE_FACTORY_ADDRESS;
//     }

//     async connectWallet() {
//         if (typeof window.ethereum !== 'undefined') {
//             try {
//                 await window.ethereum.request({ method: 'eth_requestAccounts' });
//                 this.provider = new ethers.BrowserProvider(window.ethereum);
//                 this.signer = await this.provider.getSigner();
                
//                 if (this.factoryAddress) {
//                     this.factory = new ethers.Contract(
//                         this.factoryAddress,
//                         ELECTION_FACTORY_ABI,
//                         this.signer
//                     );
//                 }
                
//                 return this.signer;
//             } catch (error) {
//                 console.error('Error connecting wallet:', error);
//                 throw error;
//             }
//         } else {
//             throw new Error('MetaMask not installed');
//         }
//     }

//     async getElections() {
//         if (!this.factory) {
//             await this.connectWallet();
//         }
        
//         try {
//             // First try to get elections count
//             let electionAddresses = [];
            
//             try {
//                 // Method 1: Try getAllElections
//                 electionAddresses = await this.factory.getAllElections();
//             } catch (error) {
//                 console.log('getAllElections failed, trying alternative method...');
                
//                 // Method 2: Try to get count and iterate
//                 try {
//                     const count = await this.factory.getElectionsCount();
//                     for (let i = 0; i < count; i++) {
//                         try {
//                             const address = await this.factory.elections(i);
//                             electionAddresses.push(address);
//                         } catch (e) {
//                             console.log(`Could not get election at index ${i}`);
//                         }
//                     }
//                 } catch (countError) {
//                     console.log('Alternative method also failed:', countError);
//                 }
//             }
            
//             console.log('Found election addresses:', electionAddresses);
            
//             const elections = [];
            
//             for (const address of electionAddresses) {
//                 try {
//                     const election = new ethers.Contract(address, ELECTION_ABI, this.provider);
                    
//                     const name = await election.electionName();
//                     const ended = await election.electionEnded();
//                     const winner = await election.winner();
//                     const totalVotes = await election.totalVotes();
//                     const candidatesCount = await election.candidatesCount();
//                     const isActive = await election.isElectionActive();
//                     const admin = await election.admin();
                    
//                     elections.push({
//                         address,
//                         name,
//                         ended,
//                         winner,
//                         totalVotes: totalVotes.toString(),
//                         candidatesCount: candidatesCount.toString(),
//                         isActive,
//                         admin
//                     });
//                 } catch (error) {
//                     console.error(`Error fetching election ${address}:`, error);
//                 }
//             }
            
//             return elections;
//         } catch (error) {
//             console.error('Error fetching elections:', error);
//             // Return empty array instead of throwing to prevent UI crash
//             return [];
//         }
//     }

//     async getElectionDetails(electionAddress) {
//         if (!this.provider) {
//             await this.connectWallet();
//         }
        
//         const election = new ethers.Contract(electionAddress, ELECTION_ABI, this.provider);
        
//         try {
//             const name = await election.electionName();
//             const ended = await election.electionEnded();
//             const winner = await election.winner();
//             const totalVotes = await election.totalVotes();
//             const candidatesCount = await election.candidatesCount();
//             const isActive = await election.isElectionActive();
//             const admin = await election.admin();
            
//             // Get all candidates
//             const candidates = [];
//             for (let i = 1; i <= candidatesCount; i++) {
//                 try {
//                     const candidate = await election.getCandidate(i);
//                     candidates.push({
//                         id: candidate[0].toString(),
//                         name: candidate[1],
//                         address: candidate[2],
//                         voteCount: candidate[3].toString()
//                     });
//                 } catch (error) {
//                     console.error(`Error fetching candidate ${i}:`, error);
//                 }
//             }
            
//             // Get voter status
//             const userAddress = await this.signer.getAddress();
//             let voterStatus;
//             try {
//                 const status = await election.getVoterStatus(userAddress);
//                 voterStatus = {
//                     registered: status[0],
//                     voted: status[1],
//                     votedFor: status[2].toString()
//                 };
//             } catch (error) {
//                 voterStatus = {
//                     registered: false,
//                     voted: false,
//                     votedFor: '0'
//                 };
//             }
            
//             return {
//                 address: electionAddress,
//                 name,
//                 ended,
//                 winner,
//                 totalVotes: totalVotes.toString(),
//                 candidatesCount: candidatesCount.toString(),
//                 isActive,
//                 admin,
//                 candidates,
//                 voterStatus
//             };
//         } catch (error) {
//             console.error('Error fetching election details:', error);
//             throw error;
//         }
//     }

//     async vote(electionAddress, candidateId) {
//         if (!this.signer) {
//             await this.connectWallet();
//         }
        
//         const election = new ethers.Contract(electionAddress, ELECTION_ABI, this.signer);
        
//         try {
//             const tx = await election.vote(candidateId);
//             await tx.wait();
//             return tx.hash;
//         } catch (error) {
//             console.error('Error voting:', error);
//             throw error;
//         }
//     }

//     async createElection(name, durationHours) {
//         if (!this.signer) {
//             await this.connectWallet();
//         }
        
//         try {
//             const tx = await this.factory.createElection(name, durationHours);
//             const receipt = await tx.wait();
//             return receipt.hash;
//         } catch (error) {
//             console.error('Error creating election:', error);
//             throw error;
//         }
//     }
// }

// export default new ContractService();


import { ethers } from 'ethers';

const ELECTION_FACTORY_ABI = [
    "function createElection(string _electionName, uint256 _durationInHours) external returns (address)",
    "function getAllElections() external view returns (address[])",
    "function getElectionsCount() external view returns (uint256)",
    "function elections(uint256) external view returns (address)",
    "event ElectionCreated(address indexed electionAddress, string name, address admin)"
];

const ELECTION_ABI = [
    // Admin functions
    "function addCandidate(string memory _name, address _candidateAddress) external",
    "function registerVoter(address _voter) external",
    "function endElection() external",
    "function declareWinner() external",
    
    // Voting function
    "function vote(uint256 _candidateId) external",
    
    // View functions
    "function electionName() external view returns (string memory)",
    "function electionEnded() external view returns (bool)",
    "function winner() external view returns (address)",
    "function totalVotes() external view returns (uint256)",
    "function candidatesCount() external view returns (uint256)",
    "function admin() external view returns (address)",
    "function startTime() external view returns (uint256)",
    "function endTime() external view returns (uint256)",
    
    // Candidate functions
    "function getCandidate(uint256 _candidateId) external view returns (uint256, string memory, address, uint256)",
    "function candidates(uint256) external view returns (uint256 id, string memory name, address candidateAddress, uint256 voteCount)",
    
    // Voter functions
    "function getVoterStatus(address _voter) external view returns (bool registered, bool voted, uint256 votedFor)",
    "function voters(address) external view returns (bool registered, bool voted, uint256 votedFor)",
    "function isElectionActive() external view returns (bool)"
];

class ContractService {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.factory = null;
        this.factoryAddress = import.meta.env.VITE_FACTORY_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    }

    async connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.provider = new ethers.BrowserProvider(window.ethereum);
                this.signer = await this.provider.getSigner();
                
                console.log("Connected to wallet:", await this.signer.getAddress());
                console.log("Factory address:", this.factoryAddress);
                
                if (this.factoryAddress) {
                    this.factory = new ethers.Contract(
                        this.factoryAddress,
                        ELECTION_FACTORY_ABI,
                        this.signer
                    );
                    console.log("Factory contract initialized");
                }
                
                return this.signer;
            } catch (error) {
                console.error('Error connecting wallet:', error);
                throw error;
            }
        } else {
            throw new Error('MetaMask not installed');
        }
    }

    async getElections() {
        try {
            if (!this.factory) {
                await this.connectWallet();
            }
            
            console.log("Fetching elections...");
            
            let electionAddresses = [];
            
            // Method 1: Try getAllElections
            try {
                electionAddresses = await this.factory.getAllElections();
                console.log("getAllElections result:", electionAddresses);
            } catch (error) {
                console.log("getAllElections failed, trying alternative methods...", error);
                
                // Method 2: Try getElectionsCount and iterate
                try {
                    const count = await this.factory.getElectionsCount();
                    console.log("Elections count:", count.toString());
                    
                    for (let i = 0; i < count; i++) {
                        try {
                            const address = await this.factory.elections(i);
                            electionAddresses.push(address);
                        } catch (e) {
                            console.log(`Could not get election at index ${i}`);
                        }
                    }
                } catch (countError) {
                    console.log("Alternative methods failed:", countError);
                }
            }
            
            console.log("Final election addresses:", electionAddresses);
            
            const elections = [];
            
            for (const address of electionAddresses) {
                try {
                    const election = new ethers.Contract(address, ELECTION_ABI, this.provider);
                    
                    const name = await election.electionName();
                    const ended = await election.electionEnded();
                    const winner = await election.winner();
                    const totalVotes = await election.totalVotes();
                    const candidatesCount = await election.candidatesCount();
                    const isActive = await election.isElectionActive();
                    const admin = await election.admin();
                    
                    elections.push({
                        address,
                        name,
                        ended,
                        winner,
                        totalVotes: totalVotes.toString(),
                        candidatesCount: candidatesCount.toString(),
                        isActive,
                        admin
                    });
                    
                    console.log(`Loaded election: ${name} at ${address}`);
                } catch (error) {
                    console.error(`Error fetching election ${address}:`, error);
                }
            }
            
            return elections;
        } catch (error) {
            console.error('Error in getElections:', error);
            return [];
        }
    }

    async createElection(name, durationHours) {
        if (!this.signer) {
            await this.connectWallet();
        }
        
        try {
            console.log("Creating election:", name, durationHours);
            const tx = await this.factory.createElection(name, parseInt(durationHours));
            const receipt = await tx.wait();
            
            console.log("Election creation receipt:", receipt);
            
            // Try to get the election address from events
            let electionAddress = null;
            if (receipt.logs && receipt.logs.length > 0) {
                for (const log of receipt.logs) {
                    try {
                        const parsedLog = this.factory.interface.parseLog(log);
                        if (parsedLog && parsedLog.name === 'ElectionCreated') {
                            electionAddress = parsedLog.args.electionAddress;
                            console.log("Found election address in events:", electionAddress);
                            break;
                        }
                    } catch (e) {
                        // Continue to next log
                    }
                }
            }
            
            return {
                hash: receipt.hash,
                electionAddress: electionAddress
            };
        } catch (error) {
            console.error('Error creating election:', error);
            throw error;
        }
    }

    // ... rest of the methods remain the same
    async getElectionDetails(electionAddress) {
        if (!this.provider) {
            await this.connectWallet();
        }
        
        const election = new ethers.Contract(electionAddress, ELECTION_ABI, this.provider);
        
        try {
            const name = await election.electionName();
            const ended = await election.electionEnded();
            const winner = await election.winner();
            const totalVotes = await election.totalVotes();
            const candidatesCount = await election.candidatesCount();
            const isActive = await election.isElectionActive();
            const admin = await election.admin();
            
            // Get all candidates
            const candidates = [];
            for (let i = 1; i <= candidatesCount; i++) {
                try {
                    const candidate = await election.getCandidate(i);
                    candidates.push({
                        id: candidate[0].toString(),
                        name: candidate[1],
                        address: candidate[2],
                        voteCount: candidate[3].toString()
                    });
                } catch (error) {
                    console.error(`Error fetching candidate ${i}:`, error);
                }
            }
            
            // Get voter status
            const userAddress = await this.signer.getAddress();
            let voterStatus;
            try {
                const status = await election.getVoterStatus(userAddress);
                voterStatus = {
                    registered: status[0],
                    voted: status[1],
                    votedFor: status[2].toString()
                };
            } catch (error) {
                voterStatus = {
                    registered: false,
                    voted: false,
                    votedFor: '0'
                };
            }
            
            return {
                address: electionAddress,
                name,
                ended,
                winner,
                totalVotes: totalVotes.toString(),
                candidatesCount: candidatesCount.toString(),
                isActive,
                admin,
                candidates,
                voterStatus
            };
        } catch (error) {
            console.error('Error fetching election details:', error);
            throw error;
        }
    }

    async vote(electionAddress, candidateId) {
        if (!this.signer) {
            await this.connectWallet();
        }
        
        const election = new ethers.Contract(electionAddress, ELECTION_ABI, this.signer);
        
        try {
            const tx = await election.vote(candidateId);
            await tx.wait();
            return tx.hash;
        } catch (error) {
            console.error('Error voting:', error);
            throw error;
        }
    }
}

export default new ContractService();