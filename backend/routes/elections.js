const express = require('express');
const { ethers } = require('ethers');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// // Middleware to check admin token
// const authenticateAdmin = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     const adminToken = process.env.ADMIN_TOKEN;
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'Admin token required' });
//     }
    
//     const token = authHeader.split(' ')[1];
//     if (token !== adminToken) {
//         return res.status(401).json({ error: 'Invalid admin token' });
//     }
    
//     next();
// };

// Middleware to check admin token AND wallet address
const authenticateAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const adminToken = process.env.ADMIN_TOKEN;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Admin token required' });
    }
    
    const token = authHeader.split(' ')[1];
    if (token !== adminToken) {
        return res.status(401).json({ error: 'Invalid admin token' });
    }
    
    // Additional wallet verification (optional but recommended)
    try {
        const { wallet } = getBlockchainConnection();
        const adminWallet = process.env.ADMIN_WALLET || "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
        
        // You could also verify the transaction sender matches admin wallet
        // This adds an extra layer of security
        console.log(`Admin action performed by wallet: ${wallet.address}`);
        
    } catch (error) {
        console.error('Wallet verification error:', error);
    }
    
    next();
};

// Helper functions for JSON file operations
const readJsonFile = (filename) => {
    const filepath = path.join(__dirname, '../data', filename);
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return [];
    }
};

const writeJsonFile = (filename, data) => {
    const filepath = path.join(__dirname, '../data', filename);
    try {
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        return false;
    }
};

// Blockchain setup
const getBlockchainConnection = () => {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
    const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);
    
    // const factoryABI = [
    //     "function createElection(string _electionName, uint256 _durationInHours) external returns (address)",
    //     "function getAllElections() external view returns (address[])",
    //     "function getElectionsCount() external view returns (uint256)",
    //     "event ElectionCreated(address indexed electionAddress, string name, address admin)"
    // ];
    const factoryABI = [
        "function createElection(string memory _electionName, uint256 _durationInHours) external returns (address)",
        "function getAllElections() external view returns (address[] memory)",
        "function getElectionsCount() external view returns (uint256)",
        "function elections(uint256) external view returns (address)",
        "event ElectionCreated(address indexed electionAddress, string name, address admin)"
    ];
    
    // const electionABI = [
    //     "function addCandidate(string memory _name, address _candidateAddress) external",
    //     "function registerVoter(address _voter) external",
    //     "function vote(uint256 _candidateId) external",
    //     "function endElection() external",
    //     "function declareWinner() external",
    //     "function electionName() external view returns (string memory)",
    //     "function electionEnded() external view returns (bool)",
    //     "function winner() external view returns (address)",
    //     "function totalVotes() external view returns (uint256)",
    //     "function candidatesCount() external view returns (uint256)",
    //     "function getCandidate(uint256 _candidateId) external view returns (uint256, string memory, address, uint256)",
    //     "function getVoterStatus(address _voter) external view returns (bool registered, bool voted, uint256 votedFor)",
    //     "function isElectionActive() external view returns (bool)",
    //     "function admin() external view returns (address)"
    // ];
    const electionABI = [
        // Admin functions
        "function addCandidate(string memory _name, address _candidateAddress) external",
        "function registerVoter(address _voter) external",
        "function endElection() external",
        "function declareWinner() external",
    
        // Voter registration functions
        "function requestRegistration(string memory _voterName) external",
        "function approveRegistration(address _voter) external",
        "function rejectRegistration(address _voter) external",
        "function getRegistrationRequest(address _voter) external view returns (address, string memory, bool, uint256)",
        "function getPendingRequests() external view returns (address[] memory)",
    
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
        "function isElectionActive() external view returns (bool)",
    
        // Winner functions
        "function getWinnerDetails() external view returns (address, string memory, uint256)",
    
        // Validation functions
        "function isCandidateNameExists(string memory _name) external view returns (bool)",
        "function isCandidateAddressExists(address _candidateAddress) external view returns (bool)"
    ];
    
    const factoryAddress = process.env.FACTORY_ADDRESS;
    const factory = new ethers.Contract(factoryAddress, factoryABI, wallet);
    
    return { provider, wallet, factory, electionABI };
};

// GET /api/elections - List all elections
router.get('/elections', async (req, res) => {
    try {
        const { factory, electionABI, provider } = getBlockchainConnection();
        
        let electionAddresses = [];
        
        try {
            // Try to get elections using getAllElections
            electionAddresses = await factory.getAllElections();
        } catch (error) {
            console.log('getAllElections failed, trying getElectionsCount...');
            try {
                // Alternative method: get count and iterate
                const count = await factory.getElectionsCount();
                for (let i = 0; i < count; i++) {
                    try {
                        const address = await factory.elections(i);
                        electionAddresses.push(address);
                    } catch (e) {
                        console.log(`Could not get election at index ${i}`);
                    }
                }
            } catch (countError) {
                console.log('Both methods failed:', countError);
            }
        }
        
        const elections = [];
        
        for (const address of electionAddresses) {
            try {
                const election = new ethers.Contract(address, electionABI, provider);
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
            } catch (error) {
                console.error(`Error fetching election ${address}:`, error);
            }
        }
        
        res.json(elections);
    } catch (error) {
        console.error('Error fetching elections:', error);
        res.status(500).json({ error: 'Failed to fetch elections' });
    }
});

// GET /api/elections/:id/results - Get election results
// router.get('/elections/:id/results', async (req, res) => {
//     try {
//         const electionAddress = req.params.id;
//         const { electionABI, provider } = getBlockchainConnection();
        
//         const election = new ethers.Contract(electionAddress, electionABI, provider);
        
//         const name = await election.electionName();
//         const ended = await election.electionEnded();
//         const winner = await election.winner();
//         const totalVotes = await election.totalVotes();
//         const candidatesCount = await election.candidatesCount();
        
//         // Get all candidates
//         const candidates = [];
//         for (let i = 1; i <= candidatesCount; i++) {
//             try {
//                 const candidate = await election.getCandidate(i);
//                 candidates.push({
//                     id: candidate[0].toString(),
//                     name: candidate[1],
//                     address: candidate[2],
//                     voteCount: candidate[3].toString()
//                 });
//             } catch (error) {
//                 console.error(`Error fetching candidate ${i}:`, error);
//             }
//         }
        
//         res.json({
//             address: electionAddress,
//             name,
//             ended,
//             winner,
//             totalVotes: totalVotes.toString(),
//             candidates
//         });
//     } catch (error) {
//         console.error('Error fetching election results:', error);
//         res.status(500).json({ error: 'Failed to fetch election results' });
//     }
// });

// GET /api/elections/:id/results - Get election results
router.get('/elections/:id/results', async (req, res) => {
    try {
        const electionAddress = req.params.id;
        const { electionABI, provider } = getBlockchainConnection();
        
        const election = new ethers.Contract(electionAddress, electionABI, provider);
        
        const name = await election.electionName();
        const ended = await election.electionEnded();
        const winner = await election.winner();
        const totalVotes = await election.totalVotes();
        const candidatesCount = await election.candidatesCount();
        
        // Get all candidates
        const candidates = [];
        let winnerName = "";
        
        for (let i = 1; i <= candidatesCount; i++) {
            try {
                const candidate = await election.getCandidate(i);
                const candidateData = {
                    id: candidate[0].toString(),
                    name: candidate[1],
                    address: candidate[2],
                    voteCount: candidate[3].toString(),
                    isWinner: candidate[2].toLowerCase() === winner.toLowerCase()
                };
                
                candidates.push(candidateData);
                
                // If this candidate is the winner, store their name
                if (candidateData.isWinner) {
                    winnerName = candidateData.name;
                }
            } catch (error) {
                console.error(`Error fetching candidate ${i}:`, error);
            }
        }
        
        res.json({
            address: electionAddress,
            name,
            ended,
            winner,
            winnerName, // Add winner name here
            totalVotes: totalVotes.toString(),
            candidates
        });
    } catch (error) {
        console.error('Error fetching election results:', error);
        res.status(500).json({ error: 'Failed to fetch election results' });
    }
});

// POST /api/admin/elections - Create new election (Admin only)
// router.post('/admin/elections', authenticateAdmin, async (req, res) => {
//     try {
//         const { name, durationHours } = req.body;
        
//         if (!name || !durationHours) {
//             return res.status(400).json({ error: 'Name and durationHours are required' });
//         }
        
//         const { factory } = getBlockchainConnection();
        
//         const tx = await factory.createElection(name, parseInt(durationHours));
//         const receipt = await tx.wait();
        
//         // Get the created election address from events
//         let electionAddress = null;
//         if (receipt.logs && receipt.logs.length > 0) {
//             for (const log of receipt.logs) {
//                 try {
//                     const parsedLog = factory.interface.parseLog(log);
//                     if (parsedLog && parsedLog.name === 'ElectionCreated') {
//                         electionAddress = parsedLog.args.electionAddress;
//                         break;
//                     }
//                 } catch (e) {
//                     // Continue to next log
//                 }
//             }
//         }
        
//         res.json({ 
//             success: true, 
//             message: 'Election created successfully',
//             transactionHash: receipt.hash,
//             electionAddress: electionAddress  // Make sure this is included
//         });
//     } catch (error) {
//         console.error('Error creating election:', error);
//         res.status(500).json({ error: 'Failed to create election: ' + error.message });
//     }
// });
// POST /api/admin/elections - Create new election (Admin only)
router.post('/admin/elections', authenticateAdmin, async (req, res) => {
    try {
        const { name, durationHours } = req.body;
        
        if (!name || !durationHours) {
            return res.status(400).json({ error: 'Name and durationHours are required' });
        }

        // Validate election name length
        if (name.trim().length === 0) {
            return res.status(400).json({ error: 'Election name cannot be empty' });
        }

        const { factory } = getBlockchainConnection();
        
        // Check if election name already exists
        try {
            const isNameExists = await factory.isElectionNameExists(name);
            if (isNameExists) {
                return res.status(400).json({ 
                    error: `Election name "${name}" already exists. Please choose a different name.` 
                });
            }
        } catch (error) {
            console.log('Could not check election name existence:', error);
            // Continue with creation if check fails (fail-open approach)
        }
        
        const tx = await factory.createElection(name, parseInt(durationHours));
        const receipt = await tx.wait();
        
        // Get the created election address from events
        let electionAddress = null;
        if (receipt.logs && receipt.logs.length > 0) {
            for (const log of receipt.logs) {
                try {
                    const parsedLog = factory.interface.parseLog(log);
                    if (parsedLog && parsedLog.name === 'ElectionCreated') {
                        electionAddress = parsedLog.args.electionAddress;
                        break;
                    }
                } catch (e) {
                    // Continue to next log
                }
            }
        }
        
        res.json({ 
            success: true, 
            message: 'Election created successfully',
            transactionHash: receipt.hash,
            electionAddress: electionAddress
        });
    } catch (error) {
        console.error('Error creating election:', error);
        
        // Provide better error messages for duplicates
        if (error.reason) {
            if (error.reason.includes('Election name already exists')) {
                return res.status(400).json({ error: 'Election name already exists. Please choose a different name.' });
            }
            if (error.reason.includes('Election name cannot be empty')) {
                return res.status(400).json({ error: 'Election name cannot be empty' });
            }
            return res.status(400).json({ error: `Blockchain error: ${error.reason}` });
        } else {
            return res.status(500).json({ error: 'Failed to create election: ' + error.message });
        }
    }
});
// POST /api/admin/elections - Create new election (Admin only)
// router.post('/admin/elections', authenticateAdmin, async (req, res) => {
//     try {
//         const { name, durationHours } = req.body;
        
//         if (!name || !durationHours) {
//             return res.status(400).json({ error: 'Name and durationHours are required' });
//         }
        
//         const { factory } = getBlockchainConnection();
        
//         const tx = await factory.createElection(name, parseInt(durationHours));
//         const receipt = await tx.wait();
        
//         // Get the created election address from events
//         let electionAddress = null;
//         if (receipt.logs && receipt.logs.length > 0) {
//             for (const log of receipt.logs) {
//                 try {
//                     const parsedLog = factory.interface.parseLog(log);
//                     if (parsedLog && parsedLog.name === 'ElectionCreated') {
//                         electionAddress = parsedLog.args.electionAddress;
//                         break;
//                     }
//                 } catch (e) {
//                     // Continue to next log
//                 }
//             }
//         }
        
//         res.json({ 
//             success: true, 
//             message: 'Election created successfully',
//             transactionHash: receipt.hash,
//             electionAddress: electionAddress
//         });
//     } catch (error) {
//         console.error('Error creating election:', error);
//         res.status(500).json({ error: 'Failed to create election: ' + error.message });
//     }
// });

// // POST /api/admin/elections/:id/candidates - Add candidate (Admin only)
// router.post('/admin/elections/:id/candidates', authenticateAdmin, async (req, res) => {
//     try {
//         const electionAddress = req.params.id;
//         const { name, address: candidateAddress } = req.body;
        
//         if (!name || !candidateAddress) {
//             return res.status(400).json({ error: 'Name and candidate address are required' });
//         }
        
//         const { electionABI, wallet } = getBlockchainConnection();
//         const election = new ethers.Contract(electionAddress, electionABI, wallet);
        
//         const tx = await election.addCandidate(name, candidateAddress);
//         const receipt = await tx.wait();
        
//         res.json({ 
//             success: true, 
//             message: 'Candidate added successfully',
//             transactionHash: receipt.hash
//         });
//     } catch (error) {
//         console.error('Error adding candidate:', error);
//         res.status(500).json({ error: 'Failed to add candidate: ' + error.message });
//     }
// });

// POST /api/admin/elections/:id/candidates - Add candidate (Admin only)
// router.post('/admin/elections/:id/candidates', authenticateAdmin, async (req, res) => {
//     try {
//         const electionAddress = req.params.id;
//         const { name, address: candidateAddress } = req.body;
        
//         if (!name || !candidateAddress) {
//             return res.status(400).json({ error: 'Name and candidate address are required' });
//         }
        
//         // Validate address format
//         if (!candidateAddress.startsWith('0x') || candidateAddress.length !== 42) {
//             return res.status(400).json({ error: 'Invalid candidate address format' });
//         }
        
//         const { electionABI, wallet } = getBlockchainConnection();
//         const election = new ethers.Contract(electionAddress, electionABI, wallet);
        
//         // Check if we're the admin of this election
//         try {
//             const electionAdmin = await election.admin();
//             if (electionAdmin.toLowerCase() !== wallet.address.toLowerCase()) {
//                 return res.status(403).json({ 
//                     error: `You are not the admin of this election. Election admin: ${electionAdmin}, Your address: ${wallet.address}` 
//                 });
//             }
//         } catch (error) {
//             console.log('Could not verify admin status:', error);
//         }
        
//         const tx = await election.addCandidate(name, candidateAddress);
//         const receipt = await tx.wait();
        
//         res.json({ 
//             success: true, 
//             message: 'Candidate added successfully',
//             transactionHash: receipt.hash
//         });
//     } catch (error) {
//         console.error('Error adding candidate:', error);
        
//         // Provide better error messages
//         if (error.reason) {
//             return res.status(400).json({ error: `Blockchain error: ${error.reason}` });
//         } else if (error.info && error.info.error) {
//             return res.status(400).json({ error: `Blockchain error: ${error.info.error.message}` });
//         } else {
//             return res.status(500).json({ error: 'Failed to add candidate: ' + error.message });
//         }
//     }
// });

// POST /api/admin/elections/:id/candidates - Add candidate (Admin only)
router.post('/admin/elections/:id/candidates', authenticateAdmin, async (req, res) => {
    try {
        const electionAddress = req.params.id;
        const { name, address: candidateAddress } = req.body;
        
        if (!name || !candidateAddress) {
            return res.status(400).json({ error: 'Name and candidate address are required' });
        }
        
        // Validate address format
        if (!candidateAddress.startsWith('0x') || candidateAddress.length !== 42) {
            return res.status(400).json({ error: 'Invalid candidate address format' });
        }
        
        const { electionABI, wallet } = getBlockchainConnection();
        const election = new ethers.Contract(electionAddress, electionABI, wallet);
        
        // Check for duplicate candidate name
        try {
            const isNameExists = await election.isCandidateNameExists(name);
            if (isNameExists) {
                return res.status(400).json({ 
                    error: `Candidate name "${name}" already exists in this election` 
                });
            }
        } catch (error) {
            console.log('Could not check candidate name existence:', error);
        }
        
        // Check for duplicate candidate address
        try {
            const isAddressExists = await election.isCandidateAddressExists(candidateAddress);
            if (isAddressExists) {
                return res.status(400).json({ 
                    error: `Candidate address ${candidateAddress} is already registered in this election` 
                });
            }
        } catch (error) {
            console.log('Could not check candidate address existence:', error);
        }
        
        const tx = await election.addCandidate(name, candidateAddress);
        const receipt = await tx.wait();
        
        res.json({ 
            success: true, 
            message: 'Candidate added successfully',
            transactionHash: receipt.hash
        });
    } catch (error) {
        console.error('Error adding candidate:', error);
        
        // Provide better error messages for duplicates
        if (error.reason) {
            if (error.reason.includes('Candidate name already exists')) {
                return res.status(400).json({ error: 'Candidate name already exists in this election' });
            }
            if (error.reason.includes('Candidate address already exists')) {
                return res.status(400).json({ error: 'Candidate address is already registered in this election' });
            }
            return res.status(400).json({ error: `Blockchain error: ${error.reason}` });
        } else if (error.info && error.info.error) {
            return res.status(400).json({ error: `Blockchain error: ${error.info.error.message}` });
        } else {
            return res.status(500).json({ error: 'Failed to add candidate: ' + error.message });
        }
    }
});

// POST /api/admin/elections/:id/voters - Register voter (Admin only)
router.post('/admin/elections/:id/voters', authenticateAdmin, async (req, res) => {
    try {
        const electionAddress = req.params.id;
        const { voterAddress } = req.body;
        
        if (!voterAddress) {
            return res.status(400).json({ error: 'Voter address is required' });
        }
        
        const { electionABI, wallet } = getBlockchainConnection();
        const election = new ethers.Contract(electionAddress, electionABI, wallet);
        
        const tx = await election.registerVoter(voterAddress);
        const receipt = await tx.wait();
        
        res.json({ 
            success: true, 
            message: 'Voter registered successfully',
            transactionHash: receipt.hash
        });
    } catch (error) {
        console.error('Error registering voter:', error);
        res.status(500).json({ error: 'Failed to register voter: ' + error.message });
    }
});

// // POST /api/admin/elections/:id/end - End election (Admin only)
// router.post('/admin/elections/:id/end', authenticateAdmin, async (req, res) => {
//     try {
//         const electionAddress = req.params.id;
//         const { electionABI, wallet } = getBlockchainConnection();
//         const election = new ethers.Contract(electionAddress, electionABI, wallet);
        
//         const tx = await election.endElection();
//         const receipt = await tx.wait();
        
//         res.json({ 
//             success: true, 
//             message: 'Election ended successfully',
//             transactionHash: receipt.hash
//         });
//     } catch (error) {
//         console.error('Error ending election:', error);
//         res.status(500).json({ error: 'Failed to end election: ' + error.message });
//     }
// });

// POST /api/admin/elections/:id/declare - Declare winner (Admin only)
router.post('/admin/elections/:id/declare', authenticateAdmin, async (req, res) => {
    try {
        const electionAddress = req.params.id;
        const { electionABI, wallet } = getBlockchainConnection();
        const election = new ethers.Contract(electionAddress, electionABI, wallet);
        
        // Check election status first
        const electionEnded = await election.electionEnded();
        const winner = await election.winner();
        const candidatesCount = await election.candidatesCount();
        
        console.log(`Declaring winner for election: ${electionAddress}`);
        console.log(`Election ended: ${electionEnded}`);
        console.log(`Current winner: ${winner}`);
        console.log(`Candidates count: ${candidatesCount}`);
        
        if (!electionEnded) {
            return res.status(400).json({ 
                error: 'Election must be ended before declaring winner. Please end the election first.' 
            });
        }
        
        if (winner !== '0x0000000000000000000000000000000000000000') {
            return res.status(400).json({ 
                error: 'Winner already declared for this election' 
            });
        }
        
        if (candidatesCount === 0) {
            return res.status(400).json({ 
                error: 'No candidates in this election' 
            });
        }
        
        const tx = await election.declareWinner();
        const receipt = await tx.wait();
        
        // Get the declared winner
        const declaredWinner = await election.winner();
        
        res.json({ 
            success: true, 
            message: 'Winner declared successfully',
            transactionHash: receipt.hash,
            winner: declaredWinner
        });
    } catch (error) {
        console.error('Error declaring winner:', error);
        
        // Provide better error messages
        if (error.reason) {
            return res.status(400).json({ error: `Blockchain error: ${error.reason}` });
        } else if (error.info && error.info.error) {
            return res.status(400).json({ error: `Blockchain error: ${error.info.error.message}` });
        } else {
            return res.status(500).json({ error: 'Failed to declare winner: ' + error.message });
        }
    }
});

// POST /api/admin/elections/:id/end - End election (Admin only)
router.post('/admin/elections/:id/end', authenticateAdmin, async (req, res) => {
    try {
        const electionAddress = req.params.id;
        const { electionABI, wallet } = getBlockchainConnection();
        const election = new ethers.Contract(electionAddress, electionABI, wallet);
        
        // Check if election already ended
        const electionEnded = await election.electionEnded();
        
        if (electionEnded) {
            return res.status(400).json({ 
                error: 'Election already ended' 
            });
        }
        
        const tx = await election.endElection();
        const receipt = await tx.wait();
        
        res.json({ 
            success: true, 
            message: 'Election ended successfully',
            transactionHash: receipt.hash
        });
    } catch (error) {
        console.error('Error ending election:', error);
        
        // Provide better error messages
        if (error.reason) {
            return res.status(400).json({ error: `Blockchain error: ${error.reason}` });
        } else {
            return res.status(500).json({ error: 'Failed to end election: ' + error.message });
        }
    }
});

// POST /api/elections/:id/request-registration - Voter requests registration
// router.post('/elections/:id/request-registration', async (req, res) => {
//     try {
//         const electionAddress = req.params.id;
//         const { voterName } = req.body;
        
//         if (!voterName) {
//             return res.status(400).json({ error: 'Voter name is required' });
//         }

//         const { electionABI, provider } = getBlockchainConnection();
//         const election = new ethers.Contract(electionAddress, electionABI, provider);
        
//         // Get voter's wallet address (from frontend)
//         const voterAddress = req.body.voterAddress;
//         if (!voterAddress) {
//             return res.status(400).json({ error: 'Voter address is required' });
//         }

//         // Check if already registered
//         const voterStatus = await election.getVoterStatus(voterAddress);
//         if (voterStatus[0]) {
//             return res.status(400).json({ error: 'Already registered for this election' });
//         }

//         // Check if already requested
//         const existingRequest = await election.getRegistrationRequest(voterAddress);
//         if (existingRequest[0] !== '0x0000000000000000000000000000000000000000') {
//             return res.status(400).json({ error: 'Registration already requested' });
//         }

//         // For this demo, we'll use the provider to send the transaction
//         // In production, the frontend would send this transaction directly
//         const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);
//         const electionWithSigner = new ethers.Contract(electionAddress, electionABI, wallet);
        
//         const tx = await electionWithSigner.requestRegistration(voterName);
//         const receipt = await tx.wait();

//         res.json({ 
//             success: true, 
//             message: 'Registration request submitted successfully',
//             transactionHash: receipt.hash
//         });
//     } catch (error) {
//         console.error('Error requesting registration:', error);
        
//         if (error.reason) {
//             return res.status(400).json({ error: `Blockchain error: ${error.reason}` });
//         } else {
//             return res.status(500).json({ error: 'Failed to request registration: ' + error.message });
//         }
//     }
// });
// POST /api/elections/:id/request-registration - Voter requests registration
// router.post('/elections/:id/request-registration', async (req, res) => {
//     try {
//         const electionAddress = req.params.id;
//         const { voterName } = req.body;
        
//         if (!voterName) {
//             return res.status(400).json({ error: 'Voter name is required' });
//         }

//         const { electionABI, provider } = getBlockchainConnection();
//         const election = new ethers.Contract(electionAddress, electionABI, provider);
        
//         // Get voter's wallet address (from frontend)
//         const voterAddress = req.body.voterAddress;
//         if (!voterAddress) {
//             return res.status(400).json({ error: 'Voter address is required' });
//         }

//         // Check if already registered using getVoterStatus
//         const voterStatus = await election.getVoterStatus(voterAddress);
//         if (voterStatus[0]) {
//             return res.status(400).json({ error: 'Already registered for this election' });
//         }

//         // For this demo, we'll use the provider to send the transaction
//         // In production, the frontend would send this transaction directly
//         const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);
//         const electionWithSigner = new ethers.Contract(electionAddress, electionABI, wallet);
        
//         // Try to call requestRegistration - this will work if the contract has the function
//         const tx = await electionWithSigner.requestRegistration(voterName);
//         const receipt = await tx.wait();

//         res.json({ 
//             success: true, 
//             message: 'Registration request submitted successfully',
//             transactionHash: receipt.hash
//         });
//     } catch (error) {
//         console.error('Error requesting registration:', error);
        
//         if (error.reason) {
//             if (error.reason.includes('Already registered')) {
//                 return res.status(400).json({ error: 'Already registered for this election' });
//             }
//             if (error.reason.includes('Registration already requested')) {
//                 return res.status(400).json({ error: 'Registration already requested' });
//             }
//             if (error.reason.includes('Voter name cannot be empty')) {
//                 return res.status(400).json({ error: 'Voter name cannot be empty' });
//             }
//             return res.status(400).json({ error: `Blockchain error: ${error.reason}` });
//         } else {
//             return res.status(500).json({ error: 'Failed to request registration: ' + error.message });
//         }
//     }
// });

// POST /api/elections/:id/request-registration - Voter requests registration
// router.post('/elections/:id/request-registration', async (req, res) => {
//     try {
//         const electionAddress = req.params.id;
//         const { voterName, voterAddress } = req.body;
        
//         if (!voterName || !voterAddress) {
//             return res.status(400).json({ error: 'Voter name and address are required' });
//         }

//         const { electionABI, provider } = getBlockchainConnection();
//         const election = new ethers.Contract(electionAddress, electionABI, provider);
        
//         // Check if already registered
//         const voterStatus = await election.getVoterStatus(voterAddress);
//         if (voterStatus[0]) {
//             return res.status(400).json({ error: 'Already registered for this election' });
//         }

//         // For this demo, we'll use the provider to send the transaction
//         const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);
//         const electionWithSigner = new ethers.Contract(electionAddress, electionABI, wallet);
        
//         // Call requestRegistration function
//         const tx = await electionWithSigner.requestRegistration(voterName);
//         const receipt = await tx.wait();

//         res.json({ 
//             success: true, 
//             message: 'Registration request submitted successfully',
//             transactionHash: receipt.hash
//         });
//     } catch (error) {
//         console.error('Error requesting registration:', error);
        
//         if (error.reason) {
//             return res.status(400).json({ error: `Blockchain error: ${error.reason}` });
//         } else {
//             return res.status(500).json({ error: 'Failed to request registration: ' + error.message });
//         }
//     }
// });

// GET /api/admin/elections/:id/pending-requests - Get pending registration requests

// POST /api/elections/:id/prepare-registration - Prepare registration data for frontend
// router.post('/elections/:id/prepare-registration', async (req, res) => {
//     try {
//         const electionAddress = req.params.id;
//         const { voterAddress, voterName } = req.body;
        
//         if (!voterName || !voterAddress) {
//             return res.status(400).json({ error: 'Voter name and address are required' });
//         }

//         const { electionABI, provider } = getBlockchainConnection();
//         const election = new ethers.Contract(electionAddress, electionABI, provider);

//         // Check if already registered
//         const voterStatus = await election.getVoterStatus(voterAddress);
//         if (voterStatus[0]) {
//             return res.status(400).json({ error: 'Already registered for this election' });
//         }

//         // Check if already requested
//         try {
//             const existingRequest = await election.getRegistrationRequest(voterAddress);
//             if (existingRequest[0] !== '0x0000000000000000000000000000000000000000') {
//                 return res.status(400).json({ error: 'Registration already requested' });
//             }
//         } catch (error) {
//             // Function might not exist in some contracts, continue
//         }

//         res.json({ 
//             success: true, 
//             message: 'Voter can register',
//             electionAddress: electionAddress
//         });
//     } catch (error) {
//         console.error('Error preparing registration:', error);
//         res.status(500).json({ error: 'Failed to prepare registration: ' + error.message });
//     }
// });

// POST /api/elections/:id/prepare-registration - Prepare registration data for frontend
router.post('/elections/:id/prepare-registration', async (req, res) => {
    try {
        const electionAddress = req.params.id;
        const { voterAddress, voterName } = req.body;
        
        if (!voterName || !voterAddress) {
            return res.status(400).json({ error: 'Voter name and address are required' });
        }

        const { electionABI, provider } = getBlockchainConnection();
        const election = new ethers.Contract(electionAddress, electionABI, provider);

        // Check if already registered
        const voterStatus = await election.getVoterStatus(voterAddress);
        if (voterStatus[0]) {
            return res.status(400).json({ error: 'Already registered for this election' });
        }

        // Check if already requested
        try {
            const existingRequest = await election.getRegistrationRequest(voterAddress);
            if (existingRequest[0] !== '0x0000000000000000000000000000000000000000') {
                return res.status(400).json({ error: 'Registration already requested' });
            }
        } catch (error) {
            // Function might not exist in some contracts, continue
        }

        res.json({ 
            success: true, 
            message: 'Voter can register',
            electionAddress: electionAddress
        });
    } catch (error) {
        console.error('Error preparing registration:', error);
        res.status(500).json({ error: 'Failed to prepare registration: ' + error.message });
    }
});

router.get('/admin/elections/:id/pending-requests', authenticateAdmin, async (req, res) => {
    try {
        const electionAddress = req.params.id;
        const { electionABI, provider } = getBlockchainConnection();
        const election = new ethers.Contract(electionAddress, electionABI, provider);
        
        const pendingAddresses = await election.getPendingRequests();
        
        const requests = [];
        for (const address of pendingAddresses) {
            try {
                const request = await election.getRegistrationRequest(address);
                requests.push({
                    voterAddress: request[0],
                    voterName: request[1],
                    approved: request[2],
                    requestTime: request[3].toString()
                });
            } catch (error) {
                console.error(`Error fetching request for ${address}:`, error);
            }
        }
        
        res.json({
            success: true,
            requests,
            count: requests.length
        });
    } catch (error) {
        console.error('Error fetching pending requests:', error);
        res.status(500).json({ error: 'Failed to fetch pending requests' });
    }
});

// POST /api/admin/elections/:id/approve-request - Approve registration request
router.post('/admin/elections/:id/approve-request', authenticateAdmin, async (req, res) => {
    try {
        const electionAddress = req.params.id;
        const { voterAddress } = req.body;
        
        if (!voterAddress) {
            return res.status(400).json({ error: 'Voter address is required' });
        }

        const { electionABI, wallet } = getBlockchainConnection();
        const election = new ethers.Contract(electionAddress, electionABI, wallet);
        
        const tx = await election.approveRegistration(voterAddress);
        const receipt = await tx.wait();

        res.json({ 
            success: true, 
            message: 'Registration approved successfully',
            transactionHash: receipt.hash
        });
    } catch (error) {
        console.error('Error approving registration:', error);
        
        if (error.reason) {
            return res.status(400).json({ error: `Blockchain error: ${error.reason}` });
        } else {
            return res.status(500).json({ error: 'Failed to approve registration: ' + error.message });
        }
    }
});

// POST /api/admin/elections/:id/reject-request - Reject registration request
router.post('/admin/elections/:id/reject-request', authenticateAdmin, async (req, res) => {
    try {
        const electionAddress = req.params.id;
        const { voterAddress } = req.body;
        
        if (!voterAddress) {
            return res.status(400).json({ error: 'Voter address is required' });
        }

        const { electionABI, wallet } = getBlockchainConnection();
        const election = new ethers.Contract(electionAddress, electionABI, wallet);
        
        const tx = await election.rejectRegistration(voterAddress);
        const receipt = await tx.wait();

        res.json({ 
            success: true, 
            message: 'Registration rejected successfully',
            transactionHash: receipt.hash
        });
    } catch (error) {
        console.error('Error rejecting registration:', error);
        
        if (error.reason) {
            return res.status(400).json({ error: `Blockchain error: ${error.reason}` });
        } else {
            return res.status(500).json({ error: 'Failed to reject registration: ' + error.message });
        }
    }
});

// POST /api/elections/:id/direct-registration - Voter sends transaction directly
router.post('/elections/:id/direct-registration', async (req, res) => {
    try {
        const electionAddress = req.params.id;
        const { voterAddress, voterName, signedTransaction } = req.body;
        
        if (!voterName || !voterAddress) {
            return res.status(400).json({ error: 'Voter name and address are required' });
        }

        const { provider } = getBlockchainConnection();
        
        // For direct registration, we just validate and let frontend handle the transaction
        // In a real app, you might want to use a relayer or other method
        
        res.json({ 
            success: true, 
            message: 'Please submit the transaction using your MetaMask wallet',
            electionAddress: electionAddress,
            voterAddress: voterAddress
        });
    } catch (error) {
        console.error('Error with direct registration:', error);
        res.status(500).json({ error: 'Failed to process registration: ' + error.message });
    }
});

module.exports = router;