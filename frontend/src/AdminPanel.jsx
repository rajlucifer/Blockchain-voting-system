// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const AdminPanel = ({ onBack }) => {
// //   const [activeTab, setActiveTab] = useState('create');
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState('');

// //   // Create Election Form
// //   const [electionForm, setElectionForm] = useState({
// //     name: '',
// //     durationHours: '24'
// //   });

// //   // Add Candidate Form
// //   const [candidateForm, setCandidateForm] = useState({
// //     electionAddress: '',
// //     name: '',
// //     address: ''
// //   });

// //   // Register Voter Form
// //   const [voterForm, setVoterForm] = useState({
// //     electionAddress: '',
// //     voterAddress: ''
// //   });

// //   // Manage Election Form
// //   const [manageForm, setManageForm] = useState({
// //     electionAddress: ''
// //   });

// //   const API_BASE = 'http://localhost:4000/api';
// //   const ADMIN_TOKEN = 'supersecrettoken';

// //   const apiClient = axios.create({
// //     baseURL: API_BASE,
// //     headers: {
// //       'Authorization': `Bearer ${ADMIN_TOKEN}`,
// //       'Content-Type': 'application/json'
// //     }
// //   });

// //   const handleCreateElection = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage('');

// //     try {
// //       const response = await apiClient.post('/admin/elections', electionForm);
// //       setMessage(`Election created successfully! TX: ${response.data.transactionHash}`);
// //       setElectionForm({ name: '', durationHours: '24' });
// //     } catch (error) {
// //       setMessage('Error: ' + (error.response?.data?.error || error.message));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// // //   const handleAddCandidate = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setMessage('');

// // //     try {
// // //       const response = await apiClient.post(
// // //         `/admin/elections/${candidateForm.electionAddress}/candidates`,
// // //         {
// // //           name: candidateForm.name,
// // //           address: candidateForm.address
// // //         }
// // //       );
// // //       setMessage(`Candidate added successfully! TX: ${response.data.transactionHash}`);
// // //       setCandidateForm({ electionAddress: '', name: '', address: '' });
// // //     } catch (error) {
// // //       setMessage('Error: ' + (error.response?.data?.error || error.message));
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };
// //     const handleAddCandidate = async (e) => {
// //   e.preventDefault();
// //   setLoading(true);
// //   setMessage('');

// //   // Validate inputs
// //   if (!candidateForm.electionAddress || !candidateForm.electionAddress.startsWith('0x')) {
// //     setMessage('Error: Please enter a valid election address starting with 0x');
// //     setLoading(false);
// //     return;
// //   }

// //   if (!candidateForm.name || candidateForm.name.trim() === '') {
// //     setMessage('Error: Candidate name cannot be empty');
// //     setLoading(false);
// //     return;
// //   }

// //   if (!candidateForm.address || !candidateForm.address.startsWith('0x') || candidateForm.address.length !== 42) {
// //     setMessage('Error: Please enter a valid candidate address (should start with 0x and be 42 characters long)');
// //     setLoading(false);
// //     return;
// //   }

// //   try {
// //     const response = await apiClient.post(
// //       `/admin/elections/${candidateForm.electionAddress}/candidates`,
// //       {
// //         name: candidateForm.name.trim(),
// //         address: candidateForm.address
// //       }
// //     );
// //     setMessage(`✅ Candidate added successfully! Transaction: ${response.data.transactionHash}`);
// //     setCandidateForm({ electionAddress: '', name: '', address: '' });
// //   } catch (error) {
// //     console.error('Add candidate error:', error);
// //     const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
// //     setMessage(`❌ Error: ${errorMessage}`);
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   const handleRegisterVoter = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage('');

// //     try {
// //       const response = await apiClient.post(
// //         `/admin/elections/${voterForm.electionAddress}/voters`,
// //         {
// //           voterAddress: voterForm.voterAddress
// //         }
// //       );
// //       setMessage(`Voter registered successfully! TX: ${response.data.transactionHash}`);
// //       setVoterForm({ electionAddress: '', voterAddress: '' });
// //     } catch (error) {
// //       setMessage('Error: ' + (error.response?.data?.error || error.message));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEndElection = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage('');

// //     try {
// //       const response = await apiClient.post(
// //         `/admin/elections/${manageForm.electionAddress}/end`
// //       );
// //       setMessage(`Election ended successfully! TX: ${response.data.transactionHash}`);
// //       setManageForm({ electionAddress: '' });
// //     } catch (error) {
// //       setMessage('Error: ' + (error.response?.data?.error || error.message));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDeclareWinner = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage('');

// //     try {
// //       const response = await apiClient.post(
// //         `/admin/elections/${manageForm.electionAddress}/declare`
// //       );
// //       setMessage(`Winner declared successfully! TX: ${response.data.transactionHash}`);
// //       setManageForm({ electionAddress: '' });
// //     } catch (error) {
// //       setMessage('Error: ' + (error.response?.data?.error || error.message));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const tabs = [
// //     { id: 'create', name: 'Create Election' },
// //     { id: 'candidate', name: 'Add Candidate' },
// //     { id: 'voter', name: 'Register Voter' },
// //     { id: 'manage', name: 'Manage Election' }
// //   ];

// //   return (
// //     <div>
// //       <div className="flex items-center justify-between mb-6">
// //         <button
// //           onClick={onBack}
// //           className="text-blue-500 hover:text-blue-600 font-medium"
// //         >
// //           ← Back to Elections
// //         </button>
// //         <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
// //       </div>

// //       {/* Tabs */}
// //       <div className="border-b border-gray-200 mb-6">
// //         <nav className="-mb-px flex space-x-8">
// //           {tabs.map((tab) => (
// //             <button
// //               key={tab.id}
// //               onClick={() => setActiveTab(tab.id)}
// //               className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
// //                 activeTab === tab.id
// //                   ? 'border-blue-500 text-blue-600'
// //                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //               }`}
// //             >
// //               {tab.name}
// //             </button>
// //           ))}
// //         </nav>
// //       </div>

// //       {/* Message */}
// //       {message && (
// //         <div className={`mb-4 p-4 rounded ${
// //           message.includes('Error') 
// //             ? 'bg-red-100 border border-red-400 text-red-700'
// //             : 'bg-green-100 border border-green-400 text-green-700'
// //         }`}>
// //           {message}
// //         </div>
// //       )}

// //       {/* Create Election Form */}
// //       {activeTab === 'create' && (
// //         <div className="bg-white rounded-lg shadow-md p-6">
// //           <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Election</h2>
// //           <form onSubmit={handleCreateElection} className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Election Name
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={electionForm.name}
// //                 onChange={(e) => setElectionForm({ ...electionForm, name: e.target.value })}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="Enter election name"
// //               />
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Duration (Hours)
// //               </label>
// //               <input
// //                 type="number"
// //                 required
// //                 min="1"
// //                 value={electionForm.durationHours}
// //                 onChange={(e) => setElectionForm({ ...electionForm, durationHours: e.target.value })}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="24"
// //               />
// //             </div>
            
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
// //             >
// //               {loading ? 'Creating...' : 'Create Election'}
// //             </button>
// //           </form>
// //         </div>
// //       )}

// //       {/* Add Candidate Form */}
// //       {activeTab === 'candidate' && (
// //         <div className="bg-white rounded-lg shadow-md p-6">
// //           <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Candidate</h2>
// //           <form onSubmit={handleAddCandidate} className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Election Address
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={candidateForm.electionAddress}
// //                 onChange={(e) => setCandidateForm({ ...candidateForm, electionAddress: e.target.value })}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
// //                 placeholder="0x..."
// //               />
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Candidate Name
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={candidateForm.name}
// //                 onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="Enter candidate name"
// //               />
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Candidate Address
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={candidateForm.address}
// //                 onChange={(e) => setCandidateForm({ ...candidateForm, address: e.target.value })}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
// //                 placeholder="0x..."
// //               />
// //             </div>
            
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
// //             >
// //               {loading ? 'Adding...' : 'Add Candidate'}
// //             </button>
// //           </form>
// //         </div>
// //       )}

// //       {/* Register Voter Form */}
// //       {activeTab === 'voter' && (
// //         <div className="bg-white rounded-lg shadow-md p-6">
// //           <h2 className="text-xl font-semibold text-gray-900 mb-4">Register Voter</h2>
// //           <form onSubmit={handleRegisterVoter} className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Election Address
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={voterForm.electionAddress}
// //                 onChange={(e) => setVoterForm({ ...voterForm, electionAddress: e.target.value })}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
// //                 placeholder="0x..."
// //               />
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Voter Address
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={voterForm.voterAddress}
// //                 onChange={(e) => setVoterForm({ ...voterForm, voterAddress: e.target.value })}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
// //                 placeholder="0x..."
// //               />
// //             </div>
            
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
// //             >
// //               {loading ? 'Registering...' : 'Register Voter'}
// //             </button>
// //           </form>
// //         </div>
// //       )}

// //       {/* Manage Election Form */}
// //       {activeTab === 'manage' && (
// //         <div className="bg-white rounded-lg shadow-md p-6">
// //           <h2 className="text-xl font-semibold text-gray-900 mb-4">Manage Election</h2>
// //           <div className="space-y-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Election Address
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={manageForm.electionAddress}
// //                 onChange={(e) => setManageForm({ ...manageForm, electionAddress: e.target.value })}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
// //                 placeholder="0x..."
// //               />
// //             </div>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <button
// //                 onClick={handleEndElection}
// //                 disabled={loading}
// //                 className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
// //               >
// //                 {loading ? 'Ending...' : 'End Election'}
// //               </button>
              
// //               <button
// //                 onClick={handleDeclareWinner}
// //                 disabled={loading}
// //                 className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
// //               >
// //                 {loading ? 'Declaring...' : 'Declare Winner'}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminPanel;



// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const AdminPanel = ({ onBack }) => {
// // //   const [activeTab, setActiveTab] = useState('create');
// // //   const [loading, setLoading] = useState(false);
// // //   const [message, setMessage] = useState('');
// // //   const [recentElections, setRecentElections] = useState([]);

// // //   // Create Election Form
// // //   const [electionForm, setElectionForm] = useState({
// // //     name: '',
// // //     durationHours: '24'
// // //   });

// // //   // Add Candidate Form
// // //   const [candidateForm, setCandidateForm] = useState({
// // //     electionAddress: '',
// // //     name: '',
// // //     address: ''
// // //   });

// // //   // Register Voter Form
// // //   const [voterForm, setVoterForm] = useState({
// // //     electionAddress: '',
// // //     voterAddress: ''
// // //   });

// // //   // Manage Election Form
// // //   const [manageForm, setManageForm] = useState({
// // //     electionAddress: ''
// // //   });

// // //   const API_BASE = 'http://localhost:4000/api';
// // //   const ADMIN_TOKEN = 'supersecrettoken';

// // //   const apiClient = axios.create({
// // //     baseURL: API_BASE,
// // //     headers: {
// // //       'Authorization': `Bearer ${ADMIN_TOKEN}`,
// // //       'Content-Type': 'application/json'
// // //     }
// // //   });

// // //   // Load recent elections when component mounts
// // //   useEffect(() => {
// // //     loadRecentElections();
// // //   }, []);

// // //   const loadRecentElections = async () => {
// // //     try {
// // //       const response = await apiClient.get('/elections');
// // //       setRecentElections(response.data || []);
// // //     } catch (error) {
// // //       console.error('Error loading elections:', error);
// // //     }
// // //   };

// // //   const handleCreateElection = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setMessage('');

// // //     try {
// // //       const response = await apiClient.post('/admin/elections', electionForm);
      
// // //       // Store the election address for easy access
// // //       const electionAddress = response.data.electionAddress;
      
// // //       if (electionAddress) {
// // //         setMessage(`✅ Election created successfully! 
// // //           Transaction: ${response.data.transactionHash}
// // //           Election Address: ${electionAddress}`);
        
// // //         // Auto-fill the election address in other forms
// // //         setCandidateForm(prev => ({ ...prev, electionAddress }));
// // //         setVoterForm(prev => ({ ...prev, electionAddress }));
// // //         setManageForm(prev => ({ ...prev, electionAddress }));
        
// // //         // Reload elections list
// // //         loadRecentElections();
// // //       } else {
// // //         setMessage(`✅ Election created successfully! TX: ${response.data.transactionHash} (Address not available)`);
// // //       }
      
// // //       setElectionForm({ name: '', durationHours: '24' });
// // //     } catch (error) {
// // //       setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleAddCandidate = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setMessage('');

// // //     // Validate inputs
// // //     if (!candidateForm.electionAddress || !candidateForm.electionAddress.startsWith('0x')) {
// // //       setMessage('❌ Error: Please enter a valid election address starting with 0x');
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     if (!candidateForm.name || candidateForm.name.trim() === '') {
// // //       setMessage('❌ Error: Candidate name cannot be empty');
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     if (!candidateForm.address || !candidateForm.address.startsWith('0x') || candidateForm.address.length !== 42) {
// // //       setMessage('❌ Error: Please enter a valid candidate address (should start with 0x and be 42 characters long)');
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     try {
// // //       const response = await apiClient.post(
// // //         `/admin/elections/${candidateForm.electionAddress}/candidates`,
// // //         {
// // //           name: candidateForm.name.trim(),
// // //           address: candidateForm.address
// // //         }
// // //       );
// // //       setMessage(`✅ Candidate added successfully! Transaction: ${response.data.transactionHash}`);
// // //       setCandidateForm(prev => ({ ...prev, name: '', address: '' }));
// // //     } catch (error) {
// // //       console.error('Add candidate error:', error);
// // //       const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
// // //       setMessage(`❌ Error: ${errorMessage}`);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleRegisterVoter = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setMessage('');

// // //     try {
// // //       const response = await apiClient.post(
// // //         `/admin/elections/${voterForm.electionAddress}/voters`,
// // //         {
// // //           voterAddress: voterForm.voterAddress
// // //         }
// // //       );
// // //       setMessage(`✅ Voter registered successfully! TX: ${response.data.transactionHash}`);
// // //       setVoterForm(prev => ({ ...prev, voterAddress: '' }));
// // //     } catch (error) {
// // //       setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleEndElection = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setMessage('');

// // //     try {
// // //       const response = await apiClient.post(
// // //         `/admin/elections/${manageForm.electionAddress}/end`
// // //       );
// // //       setMessage(`✅ Election ended successfully! TX: ${response.data.transactionHash}`);
// // //       setManageForm({ electionAddress: '' });
// // //     } catch (error) {
// // //       setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDeclareWinner = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setMessage('');

// // //     try {
// // //       const response = await apiClient.post(
// // //         `/admin/elections/${manageForm.electionAddress}/declare`
// // //       );
// // //       setMessage(`✅ Winner declared successfully! TX: ${response.data.transactionHash}`);
// // //       setManageForm({ electionAddress: '' });
// // //     } catch (error) {
// // //       setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Auto-fill election address from recent elections
// // //   const autoFillElectionAddress = (electionAddress) => {
// // //     setCandidateForm(prev => ({ ...prev, electionAddress }));
// // //     setVoterForm(prev => ({ ...prev, electionAddress }));
// // //     setManageForm(prev => ({ ...prev, electionAddress }));
// // //     setMessage(`✅ Auto-filled election address: ${electionAddress}`);
// // //   };

// // //   const tabs = [
// // //     { id: 'create', name: 'Create Election' },
// // //     { id: 'candidate', name: 'Add Candidate' },
// // //     { id: 'voter', name: 'Register Voter' },
// // //     { id: 'manage', name: 'Manage Election' }
// // //   ];

// // //   return (
// // //     <div>
// // //       <div className="flex items-center justify-between mb-6">
// // //         <button
// // //           onClick={onBack}
// // //           className="text-blue-500 hover:text-blue-600 font-medium"
// // //         >
// // //           ← Back to Elections
// // //         </button>
// // //         <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
// // //       </div>

// // //       {/* Tabs */}
// // //       <div className="border-b border-gray-200 mb-6">
// // //         <nav className="-mb-px flex space-x-8">
// // //           {tabs.map((tab) => (
// // //             <button
// // //               key={tab.id}
// // //               onClick={() => setActiveTab(tab.id)}
// // //               className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
// // //                 activeTab === tab.id
// // //                   ? 'border-blue-500 text-blue-600'
// // //                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// // //               }`}
// // //             >
// // //               {tab.name}
// // //             </button>
// // //           ))}
// // //         </nav>
// // //       </div>

// // //       {/* Recent Elections Quick Access */}
// // //       {recentElections.length > 0 && (
// // //         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
// // //           <h3 className="text-lg font-semibold text-blue-900 mb-2">📋 Recent Elections</h3>
// // //           <div className="flex flex-wrap gap-2">
// // //             {recentElections.map((election, index) => (
// // //               <button
// // //                 key={index}
// // //                 onClick={() => autoFillElectionAddress(election.address)}
// // //                 className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm font-medium"
// // //                 title={`Click to auto-fill: ${election.name}`}
// // //               >
// // //                 {election.name} ({election.address.slice(0, 8)}...)
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Message */}
// // //       {message && (
// // //         <div className={`mb-4 p-4 rounded whitespace-pre-line ${
// // //           message.includes('❌') 
// // //             ? 'bg-red-100 border border-red-400 text-red-700'
// // //             : 'bg-green-100 border border-green-400 text-green-700'
// // //         }`}>
// // //           {message}
// // //         </div>
// // //       )}

// // //       {/* Create Election Form */}
// // //       {activeTab === 'create' && (
// // //         <div className="bg-white rounded-lg shadow-md p-6">
// // //           <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Election</h2>
// // //           <form onSubmit={handleCreateElection} className="space-y-4">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Election Name
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 required
// // //                 value={electionForm.name}
// // //                 onChange={(e) => setElectionForm({ ...electionForm, name: e.target.value })}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 placeholder="Enter election name"
// // //               />
// // //             </div>
            
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Duration (Hours)
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 required
// // //                 min="1"
// // //                 value={electionForm.durationHours}
// // //                 onChange={(e) => setElectionForm({ ...electionForm, durationHours: e.target.value })}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 placeholder="24"
// // //               />
// // //             </div>
            
// // //             <button
// // //               type="submit"
// // //               disabled={loading}
// // //               className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
// // //             >
// // //               {loading ? 'Creating...' : 'Create Election'}
// // //             </button>
// // //           </form>
// // //         </div>
// // //       )}

// // //       {/* Add Candidate Form */}
// // //       {activeTab === 'candidate' && (
// // //         <div className="bg-white rounded-lg shadow-md p-6">
// // //           <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Candidate</h2>
// // //           <form onSubmit={handleAddCandidate} className="space-y-4">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Election Address
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 required
// // //                 value={candidateForm.electionAddress}
// // //                 onChange={(e) => setCandidateForm({ ...candidateForm, electionAddress: e.target.value })}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
// // //                 placeholder="0x..."
// // //               />
// // //               <p className="text-xs text-gray-500 mt-1">This will be auto-filled after creating an election</p>
// // //             </div>
            
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Candidate Name
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 required
// // //                 value={candidateForm.name}
// // //                 onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 placeholder="Enter candidate name"
// // //               />
// // //             </div>
            
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Candidate Address
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 required
// // //                 value={candidateForm.address}
// // //                 onChange={(e) => setCandidateForm({ ...candidateForm, address: e.target.value })}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
// // //                 placeholder="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
// // //               />
// // //               <p className="text-xs text-gray-500 mt-1">Use test addresses like: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8</p>
// // //             </div>
            
// // //             <button
// // //               type="submit"
// // //               disabled={loading}
// // //               className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
// // //             >
// // //               {loading ? 'Adding...' : 'Add Candidate'}
// // //             </button>
// // //           </form>
// // //         </div>
// // //       )}

// // //       {/* Other forms remain the same */}
// // //       {/* ... Register Voter and Manage Election forms ... */}
      
// // //     </div>
// // //   );
// // // };

// // // export default AdminPanel;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminPanel = ({ onBack }) => {
//   const [activeTab, setActiveTab] = useState('create');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [recentElections, setRecentElections] = useState([]);

//   // Create Election Form
//   const [electionForm, setElectionForm] = useState({
//     name: '',
//     durationHours: '24'
//   });

//   // Add Candidate Form
//   const [candidateForm, setCandidateForm] = useState({
//     electionAddress: '',
//     name: '',
//     address: ''
//   });

//   // Register Voter Form
//   const [voterForm, setVoterForm] = useState({
//     electionAddress: '',
//     voterAddress: ''
//   });

//   // Manage Election Form
//   const [manageForm, setManageForm] = useState({
//     electionAddress: ''
//   });

//   const API_BASE = 'http://localhost:4000/api';
//   const ADMIN_TOKEN = 'supersecrettoken';

//   const apiClient = axios.create({
//     baseURL: API_BASE,
//     headers: {
//       'Authorization': `Bearer ${ADMIN_TOKEN}`,
//       'Content-Type': 'application/json'
//     }
//   });

//   // Load recent elections when component mounts
//   useEffect(() => {
//     loadRecentElections();
//   }, []);

//   const loadRecentElections = async () => {
//     try {
//       const response = await apiClient.get('/elections');
//       setRecentElections(response.data || []);
//     } catch (error) {
//       console.error('Error loading elections:', error);
//     }
//   };

//   const handleCreateElection = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const response = await apiClient.post('/admin/elections', electionForm);
      
//       // Store the election address for easy access
//       const electionAddress = response.data.electionAddress;
      
//       if (electionAddress) {
//         setMessage(`✅ Election created successfully! 
// Transaction: ${response.data.transactionHash}
// Election Address: ${electionAddress}`);
        
//         // Auto-fill the election address in other forms
//         setCandidateForm(prev => ({ ...prev, electionAddress }));
//         setVoterForm(prev => ({ ...prev, electionAddress }));
//         setManageForm(prev => ({ ...prev, electionAddress }));
        
//         // Reload elections list
//         loadRecentElections();
//       } else {
//         setMessage(`✅ Election created successfully! TX: ${response.data.transactionHash} (Address not available)`);
//       }
      
//       setElectionForm({ name: '', durationHours: '24' });
//     } catch (error) {
//       setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddCandidate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     // Validate inputs
//     if (!candidateForm.electionAddress || !candidateForm.electionAddress.startsWith('0x')) {
//       setMessage('❌ Error: Please enter a valid election address starting with 0x');
//       setLoading(false);
//       return;
//     }

//     if (!candidateForm.name || candidateForm.name.trim() === '') {
//       setMessage('❌ Error: Candidate name cannot be empty');
//       setLoading(false);
//       return;
//     }

//     if (!candidateForm.address || !candidateForm.address.startsWith('0x') || candidateForm.address.length !== 42) {
//       setMessage('❌ Error: Please enter a valid candidate address (should start with 0x and be 42 characters long)');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await apiClient.post(
//         `/admin/elections/${candidateForm.electionAddress}/candidates`,
//         {
//           name: candidateForm.name.trim(),
//           address: candidateForm.address
//         }
//       );
//       setMessage(`✅ Candidate added successfully! Transaction: ${response.data.transactionHash}`);
//       setCandidateForm(prev => ({ ...prev, name: '', address: '' }));
//     } catch (error) {
//       console.error('Add candidate error:', error);
//       const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
//       setMessage(`❌ Error: ${errorMessage}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegisterVoter = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     // Validate inputs
//     if (!voterForm.electionAddress || !voterForm.electionAddress.startsWith('0x')) {
//       setMessage('❌ Error: Please enter a valid election address starting with 0x');
//       setLoading(false);
//       return;
//     }

//     if (!voterForm.voterAddress || !voterForm.voterAddress.startsWith('0x') || voterForm.voterAddress.length !== 42) {
//       setMessage('❌ Error: Please enter a valid voter address (should start with 0x and be 42 characters long)');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await apiClient.post(
//         `/admin/elections/${voterForm.electionAddress}/voters`,
//         {
//           voterAddress: voterForm.voterAddress
//         }
//       );
//       setMessage(`✅ Voter registered successfully! TX: ${response.data.transactionHash}`);
//       setVoterForm(prev => ({ ...prev, voterAddress: '' }));
//     } catch (error) {
//       setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEndElection = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     // Validate election address
//     if (!manageForm.electionAddress || !manageForm.electionAddress.startsWith('0x')) {
//       setMessage('❌ Error: Please enter a valid election address starting with 0x');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await apiClient.post(
//         `/admin/elections/${manageForm.electionAddress}/end`
//       );
//       setMessage(`✅ Election ended successfully! TX: ${response.data.transactionHash}`);
//       setManageForm({ electionAddress: '' });
//     } catch (error) {
//       setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeclareWinner = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     // Validate election address
//     if (!manageForm.electionAddress || !manageForm.electionAddress.startsWith('0x')) {
//       setMessage('❌ Error: Please enter a valid election address starting with 0x');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await apiClient.post(
//         `/admin/elections/${manageForm.electionAddress}/declare`
//       );
//       setMessage(`✅ Winner declared successfully! TX: ${response.data.transactionHash}`);
//       setManageForm({ electionAddress: '' });
//     } catch (error) {
//       setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Auto-fill election address from recent elections
//   const autoFillElectionAddress = (electionAddress) => {
//     setCandidateForm(prev => ({ ...prev, electionAddress }));
//     setVoterForm(prev => ({ ...prev, electionAddress }));
//     setManageForm(prev => ({ ...prev, electionAddress }));
//     setMessage(`✅ Auto-filled election address: ${electionAddress}`);
//   };

//   const tabs = [
//     { id: 'create', name: 'Create Election' },
//     { id: 'candidate', name: 'Add Candidate' },
//     { id: 'voter', name: 'Register Voter' },
//     { id: 'manage', name: 'Manage Election' }
//   ];

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <button
//           onClick={onBack}
//           className="text-blue-500 hover:text-blue-600 font-medium"
//         >
//           ← Back to Elections
//         </button>
//         <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
//       </div>

//       {/* Tabs */}
//       <div className="border-b border-gray-200 mb-6">
//         <nav className="-mb-px flex space-x-8">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === tab.id
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               {tab.name}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Recent Elections Quick Access */}
//       {recentElections.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//           <h3 className="text-lg font-semibold text-blue-900 mb-2">📋 Recent Elections</h3>
//           <div className="flex flex-wrap gap-2">
//             {recentElections.map((election, index) => (
//               <button
//                 key={index}
//                 onClick={() => autoFillElectionAddress(election.address)}
//                 className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm font-medium"
//                 title={`Click to auto-fill: ${election.name}`}
//               >
//                 {election.name} ({election.address.slice(0, 8)}...)
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Message */}
//       {message && (
//         <div className={`mb-4 p-4 rounded whitespace-pre-line ${
//           message.includes('❌') 
//             ? 'bg-red-100 border border-red-400 text-red-700'
//             : 'bg-green-100 border border-green-400 text-green-700'
//         }`}>
//           {message}
//         </div>
//       )}

//       {/* Create Election Form */}
//       {activeTab === 'create' && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Election</h2>
//           <form onSubmit={handleCreateElection} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Election Name
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={electionForm.name}
//                 onChange={(e) => setElectionForm({ ...electionForm, name: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter election name"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Duration (Hours)
//               </label>
//               <input
//                 type="number"
//                 required
//                 min="1"
//                 value={electionForm.durationHours}
//                 onChange={(e) => setElectionForm({ ...electionForm, durationHours: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="24"
//               />
//             </div>
            
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
//             >
//               {loading ? 'Creating...' : 'Create Election'}
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Add Candidate Form */}
//       {activeTab === 'candidate' && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Candidate</h2>
//           <form onSubmit={handleAddCandidate} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Election Address
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={candidateForm.electionAddress}
//                 onChange={(e) => setCandidateForm({ ...candidateForm, electionAddress: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
//                 placeholder="0x..."
//               />
//               <p className="text-xs text-gray-500 mt-1">This will be auto-filled after creating an election</p>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Candidate Name
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={candidateForm.name}
//                 onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter candidate name"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Candidate Address
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={candidateForm.address}
//                 onChange={(e) => setCandidateForm({ ...candidateForm, address: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
//                 placeholder="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
//               />
//               <p className="text-xs text-gray-500 mt-1">Use test addresses like: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8</p>
//             </div>
            
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
//             >
//               {loading ? 'Adding...' : 'Add Candidate'}
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Register Voter Form */}
//       {activeTab === 'voter' && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Register Voter</h2>
//           <form onSubmit={handleRegisterVoter} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Election Address
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={voterForm.electionAddress}
//                 onChange={(e) => setVoterForm({ ...voterForm, electionAddress: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
//                 placeholder="0x..."
//               />
//               <p className="text-xs text-gray-500 mt-1">This will be auto-filled after creating an election</p>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Voter Address
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={voterForm.voterAddress}
//                 onChange={(e) => setVoterForm({ ...voterForm, voterAddress: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
//                 placeholder="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
//               />
//               <p className="text-xs text-gray-500 mt-1">Use test addresses like: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC</p>
//             </div>
            
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
//             >
//               {loading ? 'Registering...' : 'Register Voter'}
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Manage Election Form */}
//       {activeTab === 'manage' && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Manage Election</h2>
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Election Address
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={manageForm.electionAddress}
//                 onChange={(e) => setManageForm({ ...manageForm, electionAddress: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
//                 placeholder="0x..."
//               />
//               <p className="text-xs text-gray-500 mt-1">This will be auto-filled after creating an election</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <button
//                 onClick={handleEndElection}
//                 disabled={loading}
//                 className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
//               >
//                 {loading ? 'Ending...' : 'End Election'}
//               </button>
              
//               <button
//                 onClick={handleDeclareWinner}
//                 disabled={loading}
//                 className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
//               >
//                 {loading ? 'Declaring...' : 'Declare Winner'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPanel;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // Define the admin wallet address (same as in App.js)
// const ADMIN_WALLET_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

// const AdminPanel = ({ onBack }) => {
//   const [activeTab, setActiveTab] = useState('create');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [recentElections, setRecentElections] = useState([]);
//   const [currentAccount, setCurrentAccount] = useState('');
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   // Create Election Form
//   const [electionForm, setElectionForm] = useState({
//     name: '',
//     durationHours: '24'
//   });

//   // Add Candidate Form
//   const [candidateForm, setCandidateForm] = useState({
//     electionAddress: '',
//     name: '',
//     address: ''
//   });

//   // Register Voter Form
//   const [voterForm, setVoterForm] = useState({
//     electionAddress: '',
//     voterAddress: ''
//   });

//   // Manage Election Form
//   const [manageForm, setManageForm] = useState({
//     electionAddress: ''
//   });

//   const API_BASE = 'http://localhost:4000/api';
//   const ADMIN_TOKEN = 'supersecrettoken';

//   const apiClient = axios.create({
//     baseURL: API_BASE,
//     headers: {
//       'Authorization': `Bearer ${ADMIN_TOKEN}`,
//       'Content-Type': 'application/json'
//     }
//   });

//   // Check admin authorization on component mount
//   useEffect(() => {
//     checkAdminAuthorization();
//     loadRecentElections();
//   }, []);

//   const checkAdminAuthorization = async () => {
//     try {
//       // Check if MetaMask is connected
//       if (typeof window.ethereum === 'undefined') {
//         setMessage('❌ MetaMask not installed');
//         setIsAuthorized(false);
//         return;
//       }

//       // Get current account
//       const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//       if (accounts.length === 0) {
//         setMessage('❌ Please connect your wallet first');
//         setIsAuthorized(false);
//         return;
//       }

//       const account = accounts[0];
//       setCurrentAccount(account);

//       // Check if current account is admin
//       const isAdmin = account.toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase();
//       setIsAuthorized(isAdmin);

//       if (!isAdmin) {
//         setMessage(`❌ Access Denied: ${account} is not authorized as admin. Only ${ADMIN_WALLET_ADDRESS} can access Admin Panel.`);
//       }
//     } catch (error) {
//       console.error('Error checking admin authorization:', error);
//       setMessage('❌ Error checking authorization');
//       setIsAuthorized(false);
//     }
//   };

//   const loadRecentElections = async () => {
//     try {
//       const response = await apiClient.get('/elections');
//       setRecentElections(response.data || []);
//     } catch (error) {
//       console.error('Error loading elections:', error);
//     }
//   };

//   // Add security check to all admin functions
//   const secureAdminAction = (action) => {
//     if (!isAuthorized) {
//       setMessage('❌ Unauthorized: Admin privileges required');
//       return false;
//     }
//     return true;
//   };

// //   const handleCreateElection = async (e) => {
// //     e.preventDefault();
    
// //     if (!secureAdminAction()) return;
    
// //     setLoading(true);
// //     setMessage('');

// //     try {
// //       const response = await apiClient.post('/admin/elections', electionForm);
      
// //       // Store the election address for easy access
// //       const electionAddress = response.data.electionAddress;
      
// //       if (electionAddress) {
// //         setMessage(`✅ Election created successfully! 
// // Transaction: ${response.data.transactionHash}
// // Election Address: ${electionAddress}`);
        
// //         // Auto-fill the election address in other forms
// //         setCandidateForm(prev => ({ ...prev, electionAddress }));
// //         setVoterForm(prev => ({ ...prev, electionAddress }));
// //         setManageForm(prev => ({ ...prev, electionAddress }));
        
// //         // Reload elections list
// //         loadRecentElections();
// //       } else {
// //         setMessage(`✅ Election created successfully! TX: ${response.data.transactionHash} (Address not available)`);
// //       }
      
// //       setElectionForm({ name: '', durationHours: '24' });
// //     } catch (error) {
// //       setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

//   // const handleAddCandidate = async (e) => {
//   //   e.preventDefault();
    
//   //   if (!secureAdminAction()) return;
    
//   //   setLoading(true);
//   //   setMessage('');

//   //   // Validate inputs
//   //   if (!candidateForm.electionAddress || !candidateForm.electionAddress.startsWith('0x')) {
//   //     setMessage('❌ Error: Please enter a valid election address starting with 0x');
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   if (!candidateForm.name || candidateForm.name.trim() === '') {
//   //     setMessage('❌ Error: Candidate name cannot be empty');
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   if (!candidateForm.address || !candidateForm.address.startsWith('0x') || candidateForm.address.length !== 42) {
//   //     setMessage('❌ Error: Please enter a valid candidate address (should start with 0x and be 42 characters long)');
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   try {
//   //     const response = await apiClient.post(
//   //       `/admin/elections/${candidateForm.electionAddress}/candidates`,
//   //       {
//   //         name: candidateForm.name.trim(),
//   //         address: candidateForm.address
//   //       }
//   //     );
//   //     setMessage(`✅ Candidate added successfully! Transaction: ${response.data.transactionHash}`);
//   //     setCandidateForm(prev => ({ ...prev, name: '', address: '' }));
//   //   } catch (error) {
//   //     console.error('Add candidate error:', error);
//   //     const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
//   //     setMessage(`❌ Error: ${errorMessage}`);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   // In the handleAddCandidate function, add duplicate prevention:

// // In the handleCreateElection function, add validation:

// const handleCreateElection = async (e) => {
//   e.preventDefault();
  
//   if (!secureAdminAction()) return;
  
//   setLoading(true);
//   setMessage('');

//   // Validate election name
//   if (!electionForm.name || electionForm.name.trim() === '') {
//     setMessage('❌ Error: Election name cannot be empty');
//     setLoading(false);
//     return;
//   }

//   // Check for duplicate election name in recent elections (frontend validation)
//   const isDuplicateName = recentElections.some(election => 
//     election.name.toLowerCase() === electionForm.name.toLowerCase()
//   );

//   if (isDuplicateName) {
//     setMessage(`❌ Error: Election name "${electionForm.name}" already exists. Please choose a different name.`);
//     setLoading(false);
//     return;
//   }

//   try {
//     const response = await apiClient.post('/admin/elections', electionForm);
    
//     // Store the election address for easy access
//     const electionAddress = response.data.electionAddress;
    
//     if (electionAddress) {
//       setMessage(`✅ Election created successfully! 
// Transaction: ${response.data.transactionHash}
// Election Address: ${electionAddress}`);
      
//       // Auto-fill the election address in other forms
//       setCandidateForm(prev => ({ ...prev, electionAddress }));
//       setVoterForm(prev => ({ ...prev, electionAddress }));
//       setManageForm(prev => ({ ...prev, electionAddress }));
      
//       // Reload elections list
//       loadRecentElections();
//     } else {
//       setMessage(`✅ Election created successfully! TX: ${response.data.transactionHash} (Address not available)`);
//     }
    
//     setElectionForm({ name: '', durationHours: '24' });
//   } catch (error) {
//     const errorMessage = error.response?.data?.error || error.message;
    
//     // Handle duplicate name error specifically
//     if (errorMessage.includes('Election name already exists')) {
//       setMessage(`❌ Error: Election name "${electionForm.name}" already exists. Please choose a different name.`);
//     } else {
//       setMessage('❌ Error: ' + errorMessage);
//     }
//   } finally {
//     setLoading(false);
//   }
// };

// const handleAddCandidate = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setMessage('');

//   // Validate inputs
//   if (!candidateForm.electionAddress || !candidateForm.electionAddress.startsWith('0x')) {
//     setMessage('❌ Error: Please enter a valid election address starting with 0x');
//     setLoading(false);
//     return;
//   }

//   if (!candidateForm.name || candidateForm.name.trim() === '') {
//     setMessage('❌ Error: Candidate name cannot be empty');
//     setLoading(false);
//     return;
//   }

//   if (!candidateForm.address || !candidateForm.address.startsWith('0x') || candidateForm.address.length !== 42) {
//     setMessage('❌ Error: Please enter a valid candidate address (should start with 0x and be 42 characters long)');
//     setLoading(false);
//     return;
//   }

//   // Check for duplicate name in recent elections (frontend validation)
//   const isDuplicateName = recentElections.some(election => 
//     election.candidates && election.candidates.some(candidate => 
//       candidate.name.toLowerCase() === candidateForm.name.toLowerCase()
//     )
//   );

//   if (isDuplicateName) {
//     setMessage(`❌ Error: Candidate name "${candidateForm.name}" is already used in another election`);
//     setLoading(false);
//     return;
//   }

//   try {
//     const response = await apiClient.post(
//       `/admin/elections/${candidateForm.electionAddress}/candidates`,
//       {
//         name: candidateForm.name.trim(),
//         address: candidateForm.address
//       }
//     );
//     setMessage(`✅ Candidate added successfully! Transaction: ${response.data.transactionHash}`);
//     setCandidateForm(prev => ({ ...prev, name: '', address: '' }));
//   } catch (error) {
//     console.error('Add candidate error:', error);
//     const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
//     setMessage(`❌ Error: ${errorMessage}`);
//   } finally {
//     setLoading(false);
//   }
// };
//   const handleRegisterVoter = async (e) => {
//     e.preventDefault();
    
//     if (!secureAdminAction()) return;
    
//     setLoading(true);
//     setMessage('');

//     // Validate inputs
//     if (!voterForm.electionAddress || !voterForm.electionAddress.startsWith('0x')) {
//       setMessage('❌ Error: Please enter a valid election address starting with 0x');
//       setLoading(false);
//       return;
//     }

//     if (!voterForm.voterAddress || !voterForm.voterAddress.startsWith('0x') || voterForm.voterAddress.length !== 42) {
//       setMessage('❌ Error: Please enter a valid voter address (should start with 0x and be 42 characters long)');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await apiClient.post(
//         `/admin/elections/${voterForm.electionAddress}/voters`,
//         {
//           voterAddress: voterForm.voterAddress
//         }
//       );
//       setMessage(`✅ Voter registered successfully! TX: ${response.data.transactionHash}`);
//       setVoterForm(prev => ({ ...prev, voterAddress: '' }));
//     } catch (error) {
//       setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEndElection = async (e) => {
//     e.preventDefault();
    
//     if (!secureAdminAction()) return;
    
//     setLoading(true);
//     setMessage('');

//     // Validate election address
//     if (!manageForm.electionAddress || !manageForm.electionAddress.startsWith('0x')) {
//       setMessage('❌ Error: Please enter a valid election address starting with 0x');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await apiClient.post(
//         `/admin/elections/${manageForm.electionAddress}/end`
//       );
//       setMessage(`✅ Election ended successfully! TX: ${response.data.transactionHash}`);
//       setManageForm({ electionAddress: '' });
//     } catch (error) {
//       setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeclareWinner = async (e) => {
//     e.preventDefault();
    
//     if (!secureAdminAction()) return;
    
//     setLoading(true);
//     setMessage('');

//     // Validate election address
//     if (!manageForm.electionAddress || !manageForm.electionAddress.startsWith('0x')) {
//       setMessage('❌ Error: Please enter a valid election address starting with 0x');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await apiClient.post(
//         `/admin/elections/${manageForm.electionAddress}/declare`
//       );
//       setMessage(`✅ Winner declared successfully! TX: ${response.data.transactionHash}`);
//       setManageForm({ electionAddress: '' });
//     } catch (error) {
//       setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Auto-fill election address from recent elections
//   const autoFillElectionAddress = (electionAddress) => {
//     if (!secureAdminAction()) return;
    
//     setCandidateForm(prev => ({ ...prev, electionAddress }));
//     setVoterForm(prev => ({ ...prev, electionAddress }));
//     setManageForm(prev => ({ ...prev, electionAddress }));
//     setMessage(`✅ Auto-filled election address: ${electionAddress}`);
//   };

//   const tabs = [
//     { id: 'create', name: 'Create Election' },
//     { id: 'candidate', name: 'Add Candidate' },
//     { id: 'voter', name: 'Register Voter' },
//     { id: 'manage', name: 'Manage Election' }
//   ];

//   // Show unauthorized message if not authorized
//   if (!isAuthorized) {
//     return (
//       <div>
//         <div className="flex items-center justify-between mb-6">
//           <button
//             onClick={onBack}
//             className="text-blue-500 hover:text-blue-600 font-medium"
//           >
//             ← Back to Elections
//           </button>
//           <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
//         </div>

//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-6 rounded-lg text-center">
//           <h2 className="text-xl font-bold mb-4">🚫 Admin Access Restricted</h2>
//           <p className="mb-2">Only the admin wallet can access this panel.</p>
//           <p className="text-sm mb-4">
//             <strong>Connected:</strong> {currentAccount || 'Not connected'}<br />
//             <strong>Admin Wallet:</strong> {ADMIN_WALLET_ADDRESS}
//           </p>
//           <button
//             onClick={onBack}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
//           >
//             Back to Elections
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <button
//           onClick={onBack}
//           className="text-blue-500 hover:text-blue-600 font-medium"
//         >
//           ← Back to Elections
//         </button>
//         <div className="flex items-center space-x-4">
//           <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
//           <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//             ✅ Authorized Admin
//           </span>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="border-b border-gray-200 mb-6">
//         <nav className="-mb-px flex space-x-8">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === tab.id
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               {tab.name}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Recent Elections Quick Access */}
//       {recentElections.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//           <h3 className="text-lg font-semibold text-blue-900 mb-2">📋 Recent Elections</h3>
//           <div className="flex flex-wrap gap-2">
//             {recentElections.map((election, index) => (
//               <button
//                 key={index}
//                 onClick={() => autoFillElectionAddress(election.address)}
//                 className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm font-medium"
//                 title={`Click to auto-fill: ${election.name}`}
//               >
//                 {election.name} ({election.address.slice(0, 8)}...)
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Message */}
//       {message && (
//         <div className={`mb-4 p-4 rounded whitespace-pre-line ${
//           message.includes('❌') 
//             ? 'bg-red-100 border border-red-400 text-red-700'
//             : 'bg-green-100 border border-green-400 text-green-700'
//         }`}>
//           {message}
//         </div>
//       )}

//       {/* Rest of the forms remain the same */}
//       {/* Create Election Form */}
//       {/* {activeTab === 'create' && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Election</h2>
//           <form onSubmit={handleCreateElection} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Election Name
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={electionForm.name}
//                 onChange={(e) => setElectionForm({ ...electionForm, name: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter election name"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Duration (Hours)
//               </label>
//               <input
//                 type="number"
//                 required
//                 min="1"
//                 value={electionForm.durationHours}
//                 onChange={(e) => setElectionForm({ ...electionForm, durationHours: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="24"
//               />
//             </div>
            
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
//             >
//               {loading ? 'Creating...' : 'Create Election'}
//             </button>
//           </form>
//         </div>
//       )} */}
//       {/* Create Election Form */}
//       {activeTab === 'create' && (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Election</h2>
//     <form onSubmit={handleCreateElection} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Election Name *
//         </label>
//         <input
//           type="text"
//           required
//           value={electionForm.name}
//           onChange={(e) => setElectionForm({ ...electionForm, name: e.target.value })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter unique election name"
//         />
//         <p className="text-xs text-gray-500 mt-1">
//           Election name must be unique across all elections
//         </p>
        
//         {/* Show warning if name might be duplicate */}
//         {electionForm.name && recentElections.some(e => 
//           e.name.toLowerCase() === electionForm.name.toLowerCase()
//         ) && (
//           <p className="text-xs text-red-500 mt-1">
//             ⚠️ This election name already exists
//           </p>
//         )}
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Duration (Hours) *
//         </label>
//         <input
//           type="number"
//           required
//           min="1"
//           value={electionForm.durationHours}
//           onChange={(e) => setElectionForm({ ...electionForm, durationHours: e.target.value })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="24"
//         />
//       </div>
      
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
//       >
//         {loading ? 'Creating...' : 'Create Election'}
//       </button>
//     </form>
//   </div>
//       )}

//       {/* Add Candidate Form */}
//       {activeTab === 'candidate' && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Candidate</h2>
//           <form onSubmit={handleAddCandidate} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Election Address
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={candidateForm.electionAddress}
//                 onChange={(e) => setCandidateForm({ ...candidateForm, electionAddress: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
//                 placeholder="0x..."
//               />
//               <p className="text-xs text-gray-500 mt-1">This will be auto-filled after creating an election</p>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Candidate Name
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={candidateForm.name}
//                 onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter candidate name"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Candidate Address
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={candidateForm.address}
//                 onChange={(e) => setCandidateForm({ ...candidateForm, address: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
//                 placeholder="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
//               />
//               <p className="text-xs text-gray-500 mt-1">Use test addresses like: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8</p>
//             </div>
            
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
//             >
//               {loading ? 'Adding...' : 'Add Candidate'}
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Register Voter Form */}
//       {activeTab === 'voter' && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Register Voter</h2>
//           <form onSubmit={handleRegisterVoter} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Election Address
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={voterForm.electionAddress}
//                 onChange={(e) => setVoterForm({ ...voterForm, electionAddress: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
//                 placeholder="0x..."
//               />
//               <p className="text-xs text-gray-500 mt-1">This will be auto-filled after creating an election</p>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Voter Address
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={voterForm.voterAddress}
//                 onChange={(e) => setVoterForm({ ...voterForm, voterAddress: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
//                 placeholder="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
//               />
//               <p className="text-xs text-gray-500 mt-1">Use test addresses like: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC</p>
//             </div>
            
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
//             >
//               {loading ? 'Registering...' : 'Register Voter'}
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Manage Election Form */}
      
//       {activeTab === 'manage' && (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h2 className="text-xl font-semibold text-gray-900 mb-4">Manage Election</h2>
    
//     {/* Election Status Display */}
//     <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//       <h3 className="text-lg font-semibold text-gray-900 mb-2">Election Status</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//         <div>
//           <span className="font-medium">Election Address:</span>
//           <div className="font-mono text-xs break-all mt-1">{manageForm.electionAddress}</div>
//         </div>
//         <div className="flex items-center">
//           <span className="font-medium mr-2">Status:</span>
//           <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
//             Check after entering address
//           </span>
//         </div>
//       </div>
//     </div>

//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Election Address
//         </label>
//         <input
//           type="text"
//           required
//           value={manageForm.electionAddress}
//           onChange={(e) => setManageForm({ ...manageForm, electionAddress: e.target.value })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
//           placeholder="0x..."
//         />
//         <p className="text-xs text-gray-500 mt-1">This will be auto-filled after creating an election</p>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <button
//           onClick={handleEndElection}
//           disabled={loading}
//           className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-md transition-colors font-medium"
//         >
//           {loading ? 'Ending...' : '🛑 End Election'}
//         </button>
        
//         <button
//           onClick={handleDeclareWinner}
//           disabled={loading}
//           className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-md transition-colors font-medium"
//         >
//           {loading ? 'Declaring...' : '🏆 Declare Winner'}
//         </button>
//       </div>
      
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//         <h4 className="font-semibold text-blue-900 mb-2">Instructions:</h4>
//         <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
//           <li>First, <strong>End Election</strong> to stop voting</li>
//           <li>Then, <strong>Declare Winner</strong> to calculate and set the winner</li>
//           <li>Admin can end election anytime (no time restriction)</li>
//         </ul>
//       </div>
//     </div>
//   </div>
//       )}
//     </div>
//   );
// };

// export default AdminPanel;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the admin wallet address (same as in App.js)
const ADMIN_WALLET_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const AdminPanel = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('create');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [recentElections, setRecentElections] = useState([]);
  const [currentAccount, setCurrentAccount] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Create Election Form
  const [electionForm, setElectionForm] = useState({
    name: '',
    durationHours: '24'
  });

  // Add Candidate Form
  const [candidateForm, setCandidateForm] = useState({
    electionAddress: '',
    name: '',
    address: ''
  });

  // Register Voter Form
  const [voterForm, setVoterForm] = useState({
    electionAddress: '',
    voterAddress: ''
  });

  // Manage Election Form
  const [manageForm, setManageForm] = useState({
    electionAddress: ''
  });

  // Add new state for pending requests
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedElectionForRequests, setSelectedElectionForRequests] = useState('');

  const API_BASE = 'http://localhost:4000/api';
  const ADMIN_TOKEN = 'supersecrettoken';

  const apiClient = axios.create({
    baseURL: API_BASE,
    headers: {
      'Authorization': `Bearer ${ADMIN_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  // Check admin authorization on component mount
  useEffect(() => {
    checkAdminAuthorization();
    loadRecentElections();
  }, []);

  const checkAdminAuthorization = async () => {
    try {
      // Check if MetaMask is connected
      if (typeof window.ethereum === 'undefined') {
        setMessage('❌ MetaMask not installed');
        setIsAuthorized(false);
        return;
      }

      // Get current account
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length === 0) {
        setMessage('❌ Please connect your wallet first');
        setIsAuthorized(false);
        return;
      }

      const account = accounts[0];
      setCurrentAccount(account);

      // Check if current account is admin
      const isAdmin = account.toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase();
      setIsAuthorized(isAdmin);

      if (!isAdmin) {
        setMessage(`❌ Access Denied: ${account} is not authorized as admin. Only ${ADMIN_WALLET_ADDRESS} can access Admin Panel.`);
      }
    } catch (error) {
      console.error('Error checking admin authorization:', error);
      setMessage('❌ Error checking authorization');
      setIsAuthorized(false);
    }
  };

  const loadRecentElections = async () => {
    try {
      const response = await apiClient.get('/elections');
      setRecentElections(response.data || []);
    } catch (error) {
      console.error('Error loading elections:', error);
    }
  };

  // Add function to load pending requests
  const loadPendingRequests = async (electionAddress) => {
    try {
      const response = await apiClient.get(`/admin/elections/${electionAddress}/pending-requests`);
      setPendingRequests(response.data.requests || []);
    } catch (error) {
      console.error('Error loading pending requests:', error);
      setPendingRequests([]);
    }
  };

  // Add function to approve request
  const handleApproveRequest = async (voterAddress) => {
    try {
      const response = await apiClient.post(
        `/admin/elections/${selectedElectionForRequests}/approve-request`,
        { voterAddress }
      );
      setMessage(`✅ Registration approved! Transaction: ${response.data.transactionHash}`);
      loadPendingRequests(selectedElectionForRequests);
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
    }
  };

  // Add function to reject request
  const handleRejectRequest = async (voterAddress) => {
    try {
      const response = await apiClient.post(
        `/admin/elections/${selectedElectionForRequests}/reject-request`,
        { voterAddress }
      );
      setMessage(`❌ Registration rejected. Transaction: ${response.data.transactionHash}`);
      loadPendingRequests(selectedElectionForRequests);
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
    }
  };

  // Add security check to all admin functions
  const secureAdminAction = (action) => {
    if (!isAuthorized) {
      setMessage('❌ Unauthorized: Admin privileges required');
      return false;
    }
    return true;
  };

  const handleCreateElection = async (e) => {
    e.preventDefault();
    
    if (!secureAdminAction()) return;
    
    setLoading(true);
    setMessage('');

    // Validate election name
    if (!electionForm.name || electionForm.name.trim() === '') {
      setMessage('❌ Error: Election name cannot be empty');
      setLoading(false);
      return;
    }

    // Check for duplicate election name in recent elections (frontend validation)
    const isDuplicateName = recentElections.some(election => 
      election.name.toLowerCase() === electionForm.name.toLowerCase()
    );

    if (isDuplicateName) {
      setMessage(`❌ Error: Election name "${electionForm.name}" already exists. Please choose a different name.`);
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post('/admin/elections', electionForm);
      
      // Store the election address for easy access
      const electionAddress = response.data.electionAddress;
      
      if (electionAddress) {
        setMessage(`✅ Election created successfully! 
Transaction: ${response.data.transactionHash}
Election Address: ${electionAddress}`);
        
        // Auto-fill the election address in other forms
        setCandidateForm(prev => ({ ...prev, electionAddress }));
        setVoterForm(prev => ({ ...prev, electionAddress }));
        setManageForm(prev => ({ ...prev, electionAddress }));
        
        // Reload elections list
        loadRecentElections();
      } else {
        setMessage(`✅ Election created successfully! TX: ${response.data.transactionHash} (Address not available)`);
      }
      
      setElectionForm({ name: '', durationHours: '24' });
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      
      // Handle duplicate name error specifically
      if (errorMessage.includes('Election name already exists')) {
        setMessage(`❌ Error: Election name "${electionForm.name}" already exists. Please choose a different name.`);
      } else {
        setMessage('❌ Error: ' + errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validate inputs
    if (!candidateForm.electionAddress || !candidateForm.electionAddress.startsWith('0x')) {
      setMessage('❌ Error: Please enter a valid election address starting with 0x');
      setLoading(false);
      return;
    }

    if (!candidateForm.name || candidateForm.name.trim() === '') {
      setMessage('❌ Error: Candidate name cannot be empty');
      setLoading(false);
      return;
    }

    if (!candidateForm.address || !candidateForm.address.startsWith('0x') || candidateForm.address.length !== 42) {
      setMessage('❌ Error: Please enter a valid candidate address (should start with 0x and be 42 characters long)');
      setLoading(false);
      return;
    }

    // Check for duplicate name in recent elections (frontend validation)
    const isDuplicateName = recentElections.some(election => 
      election.candidates && election.candidates.some(candidate => 
        candidate.name.toLowerCase() === candidateForm.name.toLowerCase()
      )
    );

    if (isDuplicateName) {
      setMessage(`❌ Error: Candidate name "${candidateForm.name}" is already used in another election`);
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post(
        `/admin/elections/${candidateForm.electionAddress}/candidates`,
        {
          name: candidateForm.name.trim(),
          address: candidateForm.address
        }
      );
      setMessage(`✅ Candidate added successfully! Transaction: ${response.data.transactionHash}`);
      setCandidateForm(prev => ({ ...prev, name: '', address: '' }));
    } catch (error) {
      console.error('Add candidate error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
      setMessage(`❌ Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterVoter = async (e) => {
    e.preventDefault();
    
    if (!secureAdminAction()) return;
    
    setLoading(true);
    setMessage('');

    // Validate inputs
    if (!voterForm.electionAddress || !voterForm.electionAddress.startsWith('0x')) {
      setMessage('❌ Error: Please enter a valid election address starting with 0x');
      setLoading(false);
      return;
    }

    if (!voterForm.voterAddress || !voterForm.voterAddress.startsWith('0x') || voterForm.voterAddress.length !== 42) {
      setMessage('❌ Error: Please enter a valid voter address (should start with 0x and be 42 characters long)');
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post(
        `/admin/elections/${voterForm.electionAddress}/voters`,
        {
          voterAddress: voterForm.voterAddress
        }
      );
      setMessage(`✅ Voter registered successfully! TX: ${response.data.transactionHash}`);
      setVoterForm(prev => ({ ...prev, voterAddress: '' }));
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEndElection = async (e) => {
    e.preventDefault();
    
    if (!secureAdminAction()) return;
    
    setLoading(true);
    setMessage('');

    // Validate election address
    if (!manageForm.electionAddress || !manageForm.electionAddress.startsWith('0x')) {
      setMessage('❌ Error: Please enter a valid election address starting with 0x');
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post(
        `/admin/elections/${manageForm.electionAddress}/end`
      );
      setMessage(`✅ Election ended successfully! TX: ${response.data.transactionHash}`);
      setManageForm({ electionAddress: '' });
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDeclareWinner = async (e) => {
    e.preventDefault();
    
    if (!secureAdminAction()) return;
    
    setLoading(true);
    setMessage('');

    // Validate election address
    if (!manageForm.electionAddress || !manageForm.electionAddress.startsWith('0x')) {
      setMessage('❌ Error: Please enter a valid election address starting with 0x');
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post(
        `/admin/elections/${manageForm.electionAddress}/declare`
      );
      setMessage(`✅ Winner declared successfully! TX: ${response.data.transactionHash}`);
      setManageForm({ electionAddress: '' });
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Auto-fill election address from recent elections
  const autoFillElectionAddress = (electionAddress) => {
    if (!secureAdminAction()) return;
    
    setCandidateForm(prev => ({ ...prev, electionAddress }));
    setVoterForm(prev => ({ ...prev, electionAddress }));
    setManageForm(prev => ({ ...prev, electionAddress }));
    setMessage(`✅ Auto-filled election address: ${electionAddress}`);
  };

  // Updated tabs with requests tab
  const tabs = [
    { id: 'create', name: 'Create Election' },
    { id: 'candidate', name: 'Add Candidate' },
    { id: 'voter', name: 'Register Voter' },
    { id: 'requests', name: 'Pending Requests' },
    { id: 'manage', name: 'Manage Election' }
  ];

  // Show unauthorized message if not authorized
  if (!isAuthorized) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            ← Back to Elections
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        </div>

        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-4">🚫 Admin Access Restricted</h2>
          <p className="mb-2">Only the admin wallet can access this panel.</p>
          <p className="text-sm mb-4">
            <strong>Connected:</strong> {currentAccount || 'Not connected'}<br />
            <strong>Admin Wallet:</strong> {ADMIN_WALLET_ADDRESS}
          </p>
          <button
            onClick={onBack}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Back to Elections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          ← Back to Elections
        </button>
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            ✅ Authorized Admin
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Recent Elections Quick Access */}
      {recentElections.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📋 Recent Elections</h3>
          <div className="flex flex-wrap gap-2">
            {recentElections.map((election, index) => (
              <button
                key={index}
                onClick={() => autoFillElectionAddress(election.address)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm font-medium"
                title={`Click to auto-fill: ${election.name}`}
              >
                {election.name} ({election.address.slice(0, 8)}...)
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message */}
      {message && (
        <div className={`mb-4 p-4 rounded whitespace-pre-line ${
          message.includes('❌') 
            ? 'bg-red-100 border border-red-400 text-red-700'
            : 'bg-green-100 border border-green-400 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {/* Create Election Form */}
      {activeTab === 'create' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Election</h2>
          <form onSubmit={handleCreateElection} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Election Name *
              </label>
              <input
                type="text"
                required
                value={electionForm.name}
                onChange={(e) => setElectionForm({ ...electionForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter unique election name"
              />
              <p className="text-xs text-gray-500 mt-1">
                Election name must be unique across all elections
              </p>
              
              {/* Show warning if name might be duplicate */}
              {electionForm.name && recentElections.some(e => 
                e.name.toLowerCase() === electionForm.name.toLowerCase()
              ) && (
                <p className="text-xs text-red-500 mt-1">
                  ⚠️ This election name already exists
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (Hours) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={electionForm.durationHours}
                onChange={(e) => setElectionForm({ ...electionForm, durationHours: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="24"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
            >
              {loading ? 'Creating...' : 'Create Election'}
            </button>
          </form>
        </div>
      )}

      {/* Add Candidate Form */}
      {activeTab === 'candidate' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Candidate</h2>
          <form onSubmit={handleAddCandidate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Election Address
              </label>
              <input
                type="text"
                required
                value={candidateForm.electionAddress}
                onChange={(e) => setCandidateForm({ ...candidateForm, electionAddress: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="0x..."
              />
              <p className="text-xs text-gray-500 mt-1">This will be auto-filled after creating an election</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Candidate Name
              </label>
              <input
                type="text"
                required
                value={candidateForm.name}
                onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter candidate name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Candidate Address
              </label>
              <input
                type="text"
                required
                value={candidateForm.address}
                onChange={(e) => setCandidateForm({ ...candidateForm, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
              />
              <p className="text-xs text-gray-500 mt-1">Use test addresses like: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8</p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
            >
              {loading ? 'Adding...' : 'Add Candidate'}
            </button>
          </form>
        </div>
      )}

      {/* Register Voter Form */}
      {activeTab === 'voter' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Register Voter</h2>
          <form onSubmit={handleRegisterVoter} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Election Address
              </label>
              <input
                type="text"
                required
                value={voterForm.electionAddress}
                onChange={(e) => setVoterForm({ ...voterForm, electionAddress: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="0x..."
              />
              <p className="text-xs text-gray-500 mt-1">This will be auto-filled after creating an election</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Voter Address
              </label>
              <input
                type="text"
                required
                value={voterForm.voterAddress}
                onChange={(e) => setVoterForm({ ...voterForm, voterAddress: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
              />
              <p className="text-xs text-gray-500 mt-1">Use test addresses like: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC</p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
            >
              {loading ? 'Registering...' : 'Register Voter'}
            </button>
          </form>
        </div>
      )}

      {/* Pending Requests Tab */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Registration Requests</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Election to View Requests
            </label>
            <select
              value={selectedElectionForRequests}
              onChange={(e) => {
                setSelectedElectionForRequests(e.target.value);
                if (e.target.value) {
                  loadPendingRequests(e.target.value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose an election...</option>
              {recentElections.map((election) => (
                <option key={election.address} value={election.address}>
                  {election.name}
                </option>
              ))}
            </select>
          </div>

          {selectedElectionForRequests && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Pending Requests ({pendingRequests.length})
              </h3>
              
              {pendingRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No pending registration requests</p>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((request, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-yellow-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{request.voterName}</h4>
                          <p className="text-sm text-gray-600 font-mono">{request.voterAddress}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Requested: {new Date(parseInt(request.requestTime) * 1000).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveRequest(request.voterAddress)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request.voterAddress)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Manage Election Form */}
      {activeTab === 'manage' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Manage Election</h2>
          
          {/* Election Status Display */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Election Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Election Address:</span>
                <div className="font-mono text-xs break-all mt-1">{manageForm.electionAddress}</div>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">Status:</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                  Check after entering address
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Election Address
              </label>
              <input
                type="text"
                required
                value={manageForm.electionAddress}
                onChange={(e) => setManageForm({ ...manageForm, electionAddress: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="0x..."
              />
              <p className="text-xs text-gray-500 mt-1">This will be auto-filled after creating an election</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleEndElection}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-md transition-colors font-medium"
              >
                {loading ? 'Ending...' : '🛑 End Election'}
              </button>
              
              <button
                onClick={handleDeclareWinner}
                disabled={loading}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-md transition-colors font-medium"
              >
                {loading ? 'Declaring...' : '🏆 Declare Winner'}
              </button>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Instructions:</h4>
              <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
                <li>First, <strong>End Election</strong> to stop voting</li>
                <li>Then, <strong>Declare Winner</strong> to calculate and set the winner</li>
                <li>Admin can end election anytime (no time restriction)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;