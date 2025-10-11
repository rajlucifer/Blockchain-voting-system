// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { ethers } = require('ethers');
// const path = require('path');
// const fs = require('fs');
// require('dotenv').config();

// const electionRoutes = require('./routes/elections');

// const app = express();
// const PORT = process.env.PORT || 4000;

// // Ensure data directory exists
// const dataDir = path.join(__dirname, 'data');
// if (!fs.existsSync(dataDir)) {
//     fs.mkdirSync(dataDir, { recursive: true });
// }

// // Initialize JSON files with empty arrays if they don't exist
// const initJsonFile = (filename, defaultValue = []) => {
//     const filepath = path.join(dataDir, filename);
//     if (!fs.existsSync(filepath)) {
//         fs.writeFileSync(filepath, JSON.stringify(defaultValue, null, 2));
//     }
// };

// initJsonFile('elections.json');
// initJsonFile('candidates.json');
// initJsonFile('voters.json');

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Blockchain connection
// const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
// const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);

// // Routes
// app.use('/api', electionRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ error: 'Something went wrong!' });
// });

// // 404 handler
// app.use((req, res) => {
//     res.status(404).json({ error: 'Route not found' });
// });

// app.listen(PORT, () => {
//     console.log(`Backend server running on port ${PORT}`);
//     console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// });


// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { ethers } = require('ethers');
// const path = require('path');
// const fs = require('fs');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 4000;

// // Ensure data directory exists
// const dataDir = path.join(__dirname, 'data');
// if (!fs.existsSync(dataDir)) {
//     fs.mkdirSync(dataDir, { recursive: true });
// }

// // Initialize JSON files with empty arrays if they don't exist
// const initJsonFile = (filename, defaultValue = []) => {
//     const filepath = path.join(dataDir, filename);
//     if (!fs.existsSync(filepath)) {
//         fs.writeFileSync(filepath, JSON.stringify(defaultValue, null, 2));
//     }
// };

// initJsonFile('elections.json');
// initJsonFile('candidates.json');
// initJsonFile('voters.json');

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Simple in-memory storage (replace with JSON file operations as needed)
// let electionsData = [];
// let candidatesData = [];
// let votersData = [];

// // Blockchain connection
// const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
// const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);

// // Routes
// app.get('/api/elections', async (req, res) => {
//     try {
//         // For now, return empty array - you'll implement blockchain integration
//         res.json([]);
//     } catch (error) {
//         console.error('Error fetching elections:', error);
//         res.status(500).json({ error: 'Failed to fetch elections' });
//     }
// });

// app.get('/api/elections/:id/results', async (req, res) => {
//     try {
//         const electionAddress = req.params.id;
//         // Implement election results logic
//         res.json({ 
//             address: electionAddress,
//             name: "Sample Election",
//             ended: false,
//             winner: "0x0000000000000000000000000000000000000000",
//             totalVotes: "0",
//             candidates: []
//         });
//     } catch (error) {
//         console.error('Error fetching election results:', error);
//         res.status(500).json({ error: 'Failed to fetch election results' });
//     }
// });

// // Admin routes with token authentication
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

// app.post('/api/admin/elections', authenticateAdmin, async (req, res) => {
//     try {
//         const { name, durationHours } = req.body;
        
//         if (!name || !durationHours) {
//             return res.status(400).json({ error: 'Name and durationHours are required' });
//         }
        
//         // Implement election creation logic
//         res.json({ 
//             success: true, 
//             message: 'Election created successfully',
//             transactionHash: '0x' + Math.random().toString(16).substr(2, 64)
//         });
//     } catch (error) {
//         console.error('Error creating election:', error);
//         res.status(500).json({ error: 'Failed to create election' });
//     }
// });

// // Add other admin routes similarly...

// app.listen(PORT, () => {
//     console.log(`Backend server running on port ${PORT}`);
//     console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// });



const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const electionRoutes = require('./routes/elections');

const app = express();
const PORT = process.env.PORT || 4000;

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize JSON files with empty arrays if they don't exist
const initJsonFile = (filename, defaultValue = []) => {
    const filepath = path.join(dataDir, filename);
    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, JSON.stringify(defaultValue, null, 2));
    }
};

initJsonFile('elections.json');
initJsonFile('candidates.json');
initJsonFile('voters.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', electionRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Backend server is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Log important environment variables (masked)
    console.log(`🏭 Factory Address: ${process.env.FACTORY_ADDRESS ? '✓ Set' : '✗ Missing'}`);
    console.log(`🔑 Admin Private Key: ${process.env.ADMIN_PRIVATE_KEY ? '✓ Set' : '✗ Missing'}`);
    console.log(`🌐 RPC URL: ${process.env.RPC_URL ? '✓ Set' : '✗ Using default'}`);
});