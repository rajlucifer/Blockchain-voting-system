# 🗳️ Blockchain Voting System

<div align="center">

![Solidity](https://img.shields.io/badge/Solidity-0.8.18+-363636?style=for-the-badge\&logo=solidity)
![Ethereum](https://img.shields.io/badge/Ethereum-Blockchain-3C3C3D?style=for-the-badge\&logo=ethereum)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge\&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Framework-000000?style=for-the-badge\&logo=express)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

### A Secure, Transparent & Decentralized Voting Platform Built on Ethereum

Empowering fair and tamper-proof elections through blockchain technology.

</div>

---

## 📖 Overview

**Blockchain Voting System** is a decentralized application (DApp) that leverages the Ethereum blockchain to provide a secure, transparent, and immutable voting process.

Traditional voting systems suffer from issues such as centralized control, lack of transparency, and vulnerability to manipulation. This project addresses these challenges by recording votes directly on-chain through smart contracts, ensuring election integrity and public verifiability.

The platform enables administrators to create and manage elections while allowing authenticated voters to cast votes securely using their crypto wallets.

---

## ✨ Features

### 🔒 Security & Trust

* Immutable vote recording on the blockchain
* Tamper-proof election results
* Wallet-based voter authentication
* Smart contract-enforced election rules
* Prevention of duplicate voting

### 🌐 Decentralization

* No central authority controlling vote data
* Publicly verifiable election records
* Transparent vote counting mechanism
* Trustless voting environment

### ⚡ Efficiency

* Real-time vote tallying
* Automatic winner calculation
* Instant election result availability
* Gas-efficient smart contract design

### 🏛️ Election Management

* Create multiple elections
* Register voters securely
* Add and manage candidates
* Start and end elections
* Track election history

---

## 🏗️ Architecture

The project follows a **three-tier architecture**:

```text
┌─────────────────────┐
│   React Frontend    │
│  (Vite + Tailwind)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Express Backend    │
│    REST APIs        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Ethereum Blockchain │
│ Smart Contracts     │
└─────────────────────┘
```

### Components

#### 1️⃣ Smart Contract Layer

Handles:

* Election creation
* Candidate management
* Voter registration
* Vote casting
* Result calculation

Contracts:

* `ElectionFactory.sol`
* `Election.sol`

#### 2️⃣ Backend Layer

Provides:

* Secure REST APIs
* Election administration
* Blockchain interaction using Ethers.js
* Auxiliary data management

#### 3️⃣ Frontend Layer

Provides:

* Wallet connection
* Voting dashboard
* Election management panel
* Real-time election updates

---

## 🛠️ Tech Stack

| Layer               | Technologies                   |
| ------------------- | ------------------------------ |
| Smart Contracts     | Solidity, Hardhat              |
| Blockchain          | Ethereum                       |
| Backend             | Node.js, Express.js, Ethers.js |
| Frontend            | React 19, Vite, Tailwind CSS   |
| Wallet Integration  | MetaMask                       |
| Development Network | Hardhat, Ganache               |

---

## 📂 Project Structure

```bash
Blockchain-voting-system/
│
├── contracts/
│   ├── contracts/
│   │   ├── Election.sol
│   │   └── ElectionFactory.sol
│   ├── scripts/
│   └── hardhat.config.js
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js v18+
* npm or yarn
* MetaMask Extension
* Hardhat or Ganache

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/rajlucifer/Blockchain-voting-system.git

cd Blockchain-voting-system
```

---

## 2️⃣ Smart Contract Setup

Navigate to contracts:

```bash
cd contracts
npm install
```

Compile contracts:

```bash
npx hardhat compile
```

Start local blockchain:

```bash
npx hardhat node
```

Deploy contracts:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

After deployment, copy the generated **ElectionFactory Contract Address**.

---

## 3️⃣ Backend Setup

Navigate to backend:

```bash
cd ../backend
npm install
```

Create a `.env` file:

```env
PORT=5000

RPC_URL=http://127.0.0.1:8545

ADMIN_PRIVATE_KEY=YOUR_PRIVATE_KEY

FACTORY_ADDRESS=DEPLOYED_FACTORY_ADDRESS
```

Run backend:

```bash
npm run dev
```

---

## 4️⃣ Frontend Setup

Navigate to frontend:

```bash
cd ../frontend
npm install
```

Create `.env` file:

```env
VITE_FACTORY_ADDRESS=DEPLOYED_FACTORY_ADDRESS
```

Start frontend:

```bash
npm run dev
```

Application:

```text
http://localhost:5173
```

---

# 🔌 API Endpoints

## Election Management

| Method | Endpoint                         | Description          |
| ------ | -------------------------------- | -------------------- |
| POST   | `/api/elections/create`          | Create new election  |
| GET    | `/api/elections`                 | Get all elections    |
| GET    | `/api/elections/:electionId`     | Get election details |
| POST   | `/api/elections/:electionId/end` | End election         |

## Candidate Management

| Method | Endpoint                                |
| ------ | --------------------------------------- |
| POST   | `/api/elections/:electionId/candidates` |

## Voter Management

| Method | Endpoint                            |
| ------ | ----------------------------------- |
| POST   | `/api/elections/:electionId/voters` |

---

# 📜 Smart Contracts

## Election.sol

Core contract responsible for managing a single election.

### Functions

| Function          | Access           | Description    |
| ----------------- | ---------------- | -------------- |
| `addCandidate()`  | Admin            | Add candidate  |
| `registerVoter()` | Admin            | Register voter |
| `vote()`          | Registered Voter | Cast vote      |
| `endElection()`   | Admin            | End election   |
| `getWinner()`     | Public View      | Fetch winner   |

---

## ElectionFactory.sol

Factory contract responsible for deploying and tracking elections.

### Functions

| Function                 | Description         |
| ------------------------ | ------------------- |
| `createElection()`       | Deploy new election |
| `getDeployedElections()` | Get all elections   |

---

# 🔐 Security Features

### Admin Controls

Only administrators can:

* Create elections
* Add candidates
* Register voters
* End elections

### Voter Protection

* One voter → One vote
* Wallet-based identity
* Registered voters only
* Double-voting prevention

### Election Rules

* Time-bound voting period
* Automatic vote validation
* Immutable vote storage
* Transparent result calculation

---

# 🎯 Future Improvements

* DAO-based governance
* Multi-signature admin controls
* zkProof-based anonymous voting
* IPFS integration
* Mobile application support
* Multi-chain deployment

---

# 🤝 Contributing

Contributions are welcome!

```bash
Fork the repository

Create your feature branch

Commit your changes

Push to the branch

Open a Pull Request
```

---

# 📄 License

Distributed under the MIT License.

See the `LICENSE` file for more information.

---

# 👨‍💻 Author

### RAHUL RAJ

**Full Stack & Blockchain Developer**

* MERN Stack Developer
* Smart Contract Developer
* Web3 Enthusiast
* Open Source Contributor

GitHub: https://github.com/rajlucifer

---

## ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the project

🛠️ Contribute to improve it

---

<div align="center">

### Built with ❤️ using Ethereum, Solidity, React & Node.js

</div>
