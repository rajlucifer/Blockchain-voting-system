import React, { useState, useEffect } from 'react';
import ContractService from './ContractService';

const ElectionDetails = ({ election, onBack }) => {
  const [electionDetails, setElectionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [message, setMessage] = useState('');

  const loadElectionDetails = async () => {
    try {
      setLoading(true);
      const details = await ContractService.getElectionDetails(election.address);
      setElectionDetails(details);
      setMessage('');
    } catch (err) {
      setMessage('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      setVoting(true);
      setMessage('');
      
      const txHash = await ContractService.vote(election.address, candidateId);
      setMessage(`Vote cast successfully! Transaction: ${txHash}`);
      
      // Reload election details to reflect the vote
      setTimeout(loadElectionDetails, 2000);
    } catch (err) {
      setMessage('Error voting: ' + err.message);
    } finally {
      setVoting(false);
    }
  };

  useEffect(() => {
    loadElectionDetails();
  }, [election.address]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!electionDetails) {
    return (
      <div>
        <button
          onClick={onBack}
          className="mb-4 text-blue-500 hover:text-blue-600 font-medium"
        >
          ← Back to Elections
        </button>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Failed to load election details
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          ← Back to Elections
        </button>
        
        <div className="flex items-center space-x-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              electionDetails.ended
                ? 'bg-red-100 text-red-800'
                : electionDetails.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {electionDetails.ended ? 'Ended' : electionDetails.isActive ? 'Active' : 'Upcoming'}
          </span>
        </div>
      </div>

      {/* Election Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {electionDetails.name}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {electionDetails.candidatesCount}
            </div>
            <div className="text-gray-600">Candidates</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {electionDetails.totalVotes}
            </div>
            <div className="text-gray-600">Total Votes</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-600">Address</div>
            <div className="text-xs text-gray-500 font-mono">
              {electionDetails.address}
            </div>
          </div>
        </div>

        {/* Voter Status */}
        {electionDetails.voterStatus && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Your Voter Status
            </h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className={`px-2 py-1 rounded ${
                electionDetails.voterStatus.registered 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {electionDetails.voterStatus.registered ? 'Registered' : 'Not Registered'}
              </span>
              
              <span className={`px-2 py-1 rounded ${
                electionDetails.voterStatus.voted 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {electionDetails.voterStatus.voted ? 'Voted' : 'Not Voted'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-4 p-4 rounded ${
          message.includes('Error') 
            ? 'bg-red-100 border border-red-400 text-red-700'
            : 'bg-green-100 border border-green-400 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {/* Candidates */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Candidates</h2>
        
        {electionDetails.candidates.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No candidates registered yet</p>
        ) : (
          <div className="space-y-4">
            {electionDetails.candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {candidate.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-mono">
                      {candidate.address}
                    </p>
                    <p className="text-blue-600 font-medium mt-1">
                      Votes: {candidate.voteCount}
                    </p>
                  </div>
                  
                  {electionDetails.isActive && 
                   electionDetails.voterStatus?.registered && 
                   !electionDetails.voterStatus.voted && (
                    <button
                      onClick={() => handleVote(candidate.id)}
                      disabled={voting}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      {voting ? 'Voting...' : 'Vote'}
                    </button>
                  )}
                </div>
                
                {/* Vote progress bar */}
                {electionDetails.totalVotes > 0 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${(candidate.voteCount / electionDetails.totalVotes) * 100}%`
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {((candidate.voteCount / electionDetails.totalVotes) * 100).toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Winner Display */}
      {electionDetails.ended && electionDetails.winner !== '0x0000000000000000000000000000000000000000' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">
            🎉 Election Results
          </h3>
          <p className="text-yellow-700">
            Winner: {electionDetails.winner}
          </p>
        </div>
      )}
       

       
    </div>
  );
};

export default ElectionDetails;