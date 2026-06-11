# 🗳️ Blockchain Voting System

A decentralized, secure, and transparent voting platform built on the **Ethereum blockchain**. This system allows admins to create and manage elections, while registered voters can cast their votes in a tamper‑proof environment, ensuring trust and transparency in the electoral process.

## ✨ Key Features

- **Immutable Vote Recording** – Votes are permanently recorded on the blockchain, preventing any tampering or modification.
- **Decentralized & Transparent** – No central point of failure; election rules and vote tallies are publicly verifiable.
- **Voter Authentication** – Secure wallet‑based authentication ensures only registered voters can participate.
- **Real‑Time Vote Counting** – Results are computed automatically by the smart contract and are available instantly after voting ends.
- **Multiple Election Support** – The Election Factory pattern allows for creating and managing multiple, independent elections from a single contract.
- **Modular & Extensible Architecture** – The system comprises separate frontend, backend API, and smart contract components, making it easy to maintain and extend.

## 🛠️ Tech Stack

| Area               | Technologies                                      |
|--------------------|---------------------------------------------------|
| **Smart Contracts**| Solidity (^0.8.18), Hardhat                       |
| **Backend**        | Node.js, Express, Ethers.js                      |
| **Frontend**       | React 19, Vite, Tailwind CSS, Ethers.js          |
| **Blockchain Network** | Ethereum (Local / Hardhat / Ganache for development) |

## 🏛️ System Architecture

The application follows a three‑tier architecture:

1. **Smart Contract Layer (Blockchain)** – Core logic for election creation, candidate management, voter registration, and vote casting. It uses a factory pattern (`ElectionFactory.sol`) to deploy individual election contracts (`Election.sol`).
2. **Backend API Layer (Node.js + Express)** – Provides secure REST endpoints for admin operations, acts as an intermediary for blockchain interactions, and manages JSON storage for auxiliary election data.
3. **Frontend Client (React + Vite)** – A responsive user interface that allows voters to connect their wallets and vote, and admins to manage the entire election process.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MetaMask browser extension
- A local blockchain node (Hardhat or Ganache)

### 1. Clone the Repository

```bash
git clone https://github.com/rajlucifer/Blockchain-voting-system.git
cd Blockchain-voting-system
