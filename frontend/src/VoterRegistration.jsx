import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const VoterRegistration = ({ onBack }) => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState('');
  const [voterName, setVoterName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');

  const API_BASE = 'http://localhost:4000/api';

  // Minimal ABI for registration only
  const ELECTION_ABI = [
    "function requestRegistration(string memory _voterName) external",
    "function getVoterStatus(address _voter) external view returns (bool, bool, uint256)",
    "function getRegistrationRequest(address _voter) external view returns (address, string memory, bool, uint256)"
  ];

  const loadElections = async () => {
    try {
      const response = await fetch(`${API_BASE}/elections`);
      const data = await response.json();
      // Filter only active elections
      const activeElections = data.filter(election => 
        !election.ended && (election.isActive || new Date(election.endTime) > new Date())
      );
      setElections(activeElections);
    } catch (error) {
      console.error('Error loading elections:', error);
      setMessage('Error loading elections');
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        setMessage('❌ Please install MetaMask');
        return null;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      const account = accounts[0];
      setCurrentAccount(account);
      return account;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setMessage('❌ Failed to connect wallet');
      return null;
    }
  };

  useEffect(() => {
    loadElections();
    connectWallet();
  }, []);

  const checkRegistrationStatus = async (electionAddress, voterAddress) => {
    try {
      const response = await fetch(
        `${API_BASE}/elections/${electionAddress}/prepare-registration`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ voterAddress, voterName })
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  };

  const handleRequestRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!selectedElection) {
      setMessage('❌ Please select an election');
      setLoading(false);
      return;
    }

    if (!voterName.trim()) {
      setMessage('❌ Please enter your name');
      setLoading(false);
      return;
    }

    try {
      // Connect wallet if not already connected
      let voterAddress = currentAccount;
      if (!voterAddress) {
        voterAddress = await connectWallet();
        if (!voterAddress) {
          setLoading(false);
          return;
        }
      }

      // Step 1: Check if voter can register
      setMessage('🔍 Checking registration status...');
      const checkResult = await checkRegistrationStatus(selectedElection, voterAddress);
      
      if (!checkResult.success) {
        setMessage(`❌ ${checkResult.error}`);
        setLoading(false);
        return;
      }

      // Step 2: Voter sends transaction directly from their wallet
      setMessage('🔄 Please confirm the transaction in MetaMask...');
      
      // FIXED: Use correct ethers v6 syntax
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const electionContract = new ethers.Contract(selectedElection, ELECTION_ABI, signer);

      // Send transaction from voter's wallet
      const tx = await electionContract.requestRegistration(voterName.trim());
      
      setMessage('⏳ Transaction submitted! Waiting for confirmation...');
      
      // Wait for transaction to be mined
      const receipt = await tx.wait();
      
      setMessage(`✅ Registration request submitted successfully! 
Transaction Hash: ${receipt.hash}
The admin will review your request.`);

      // Reset form
      setVoterName('');
      setSelectedElection('');

    } catch (error) {
      console.error('Error requesting registration:', error);
      
      let errorMessage = error.message;
      if (error.reason) {
        errorMessage = error.reason;
      }
      
      // Handle specific error cases
      if (errorMessage.includes('Already registered')) {
        setMessage('❌ You are already registered for this election');
      } else if (errorMessage.includes('Registration already requested')) {
        setMessage('❌ You have already requested registration for this election');
      } else if (errorMessage.includes('user rejected transaction')) {
        setMessage('❌ Transaction was cancelled');
      } else if (errorMessage.includes('Voter name cannot be empty')) {
        setMessage('❌ Please enter your name');
      } else {
        setMessage(`❌ Error: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          ← Back to Elections
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Voter Registration</h1>
      </div>

      {/* Current Wallet Info */}
      {currentAccount && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-800 font-medium">
                Connected Wallet: {currentAccount.slice(0, 8)}...{currentAccount.slice(-6)}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                You'll submit the registration request from this wallet
              </p>
            </div>
            <button
              onClick={connectWallet}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Change Wallet
            </button>
          </div>
        </div>
      )}

      {/* Message */}
      {message && (
        <div className={`mb-4 p-4 rounded whitespace-pre-line ${
          message.includes('❌') 
            ? 'bg-red-100 border border-red-400 text-red-700'
            : message.includes('✅')
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-blue-100 border border-blue-400 text-blue-700'
        }`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Request Voter Registration</h2>
        
        <form onSubmit={handleRequestRegistration} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Election *
            </label>
            <select
              value={selectedElection}
              onChange={(e) => setSelectedElection(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            >
              <option value="">Choose an election...</option>
              {elections.map((election) => (
                <option key={election.address} value={election.address}>
                  {election.name} {election.isActive ? '(Active)' : '(Upcoming)'}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Only active elections are shown</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              value={voterName}
              onChange={(e) => setVoterName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !currentAccount}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors font-medium"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              '📝 Request Registration'
            )}
          </button>
        </form>

        {!currentAccount && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              🔒 Please connect your wallet first to request registration
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
          <ol className="text-sm text-blue-800 list-decimal list-inside space-y-1">
            <li>Connect your MetaMask wallet</li>
            <li>Select an active election you want to vote in</li>
            <li>Enter your name for identification</li>
            <li>Submit your registration request (you'll sign the transaction)</li>
            <li>Wait for admin approval</li>
            <li>Once approved, you can vote in the election</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default VoterRegistration;