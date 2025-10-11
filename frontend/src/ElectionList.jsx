// import React, { useState, useEffect } from 'react';
// import ContractService from './ContractService';

// const ElectionList = ({ onViewElection }) => {
//   const [elections, setElections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const loadElections = async () => {
//     try {
//       setLoading(true);
//       const electionData = await ContractService.getElections();
//       setElections(electionData);
//       setError('');
//     } catch (err) {
//       setError('Failed to load elections: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadElections();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">All Elections</h2>
//         <button
//           onClick={loadElections}
//           className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium"
//         >
//           Refresh
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       {elections.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No elections found</p>
//           <p className="text-gray-400">Create an election in the Admin Panel to get started</p>
//         </div>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {elections.map((election) => (
//             <div
//               key={election.address}
//               className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
//             >
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {election.name}
//               </h3>
              
//               <div className="space-y-2 mb-4">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Status:</span>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       election.ended
//                         ? 'bg-red-100 text-red-800'
//                         : election.isActive
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-yellow-100 text-yellow-800'
//                     }`}
//                   >
//                     {election.ended ? 'Ended' : election.isActive ? 'Active' : 'Upcoming'}
//                   </span>
//                 </div>
                
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Candidates:</span>
//                   <span className="text-gray-900">{election.candidatesCount}</span>
//                 </div>
                
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Total Votes:</span>
//                   <span className="text-gray-900">{election.totalVotes}</span>
//                 </div>
                
//                 {election.winner !== '0x0000000000000000000000000000000000000000' && (
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Winner:</span>
//                     <span className="text-green-600 font-medium">
//                       {election.winner?.slice(0, 6)}...{election.winner?.slice(-4)}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               <button
//                 onClick={() => onViewElection(election)}
//                 className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
//               >
//                 View Details
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ElectionList;


import React, { useState, useEffect } from 'react';
import ContractService from './ContractService';

const ElectionList = ({ onViewElection }) => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadElections = async () => {
    try {
      setLoading(true);
      const electionData = await ContractService.getElections();
      setElections(electionData || []);
      if (!electionData || electionData.length === 0) {
        setError('No elections found. Create an election first.');
      } else {
        setError('');
      }
    } catch (err) {
      console.error('Error loading elections:', err);
      setError('Failed to load elections. Make sure you are connected to the correct network.');
      setElections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadElections();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-600">Loading elections...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Elections</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Refresh Page
          </button>
          <button
            onClick={loadElections}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Reload Elections
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {error}
          <div className="mt-2 text-sm">
            <p>To fix this:</p>
            <ol className="list-decimal list-inside ml-4">
              <li>Make sure MetaMask is connected to Localhost 8545</li>
              <li>Ensure contracts are deployed</li>
              <li>Create an election in the Admin Panel</li>
            </ol>
          </div>
        </div>
      )}

      {elections.length === 0 && !error ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No elections found</p>
          <p className="text-gray-400 mt-2">Create an election in the Admin Panel to get started</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {elections.map((election) => (
            <div
              key={election.address}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {election.name}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      election.ended
                        ? 'bg-red-100 text-red-800'
                        : election.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {election.ended ? 'Ended' : election.isActive ? 'Active' : 'Upcoming'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Candidates:</span>
                  <span className="text-gray-900">{election.candidatesCount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Votes:</span>
                  <span className="text-gray-900">{election.totalVotes}</span>
                </div>
                
                {election.winner !== '0x0000000000000000000000000000000000000000' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Winner:</span>
                    <span className="text-green-600 font-medium">
                      {election.winner?.slice(0, 6)}...{election.winner?.slice(-4)}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => onViewElection(election)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                View Details
              </button>
              
              <div className="mt-2 text-xs text-gray-500 font-mono break-all">
                {election.address}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ElectionList;