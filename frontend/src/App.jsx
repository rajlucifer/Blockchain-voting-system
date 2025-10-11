// import React, { useState, useEffect } from 'react';
// import ContractService from './ContractService';
// import AdminPanel from './AdminPanel';
// import ElectionList from './ElectionList';
// import ElectionDetails from './ElectionDetails';

// function App() {
//   const [connected, setConnected] = useState(false);
//   const [account, setAccount] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [currentView, setCurrentView] = useState('elections');
//   const [selectedElection, setSelectedElection] = useState(null);

//   const connectWallet = async () => {
//     try {
//       const signer = await ContractService.connectWallet();
//       const address = await signer.getAddress();
//       setAccount(address);
//       setConnected(true);
      
//       // For demo purposes, consider first account as admin
//       setIsAdmin(true);
//     } catch (error) {
//       console.error('Failed to connect wallet:', error);
//       alert('Failed to connect wallet: ' + error.message);
//     }
//   };

//   const handleViewElection = (election) => {
//     setSelectedElection(election);
//     setCurrentView('details');
//   };

//   const handleBackToList = () => {
//     setSelectedElection(null);
//     setCurrentView('elections');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <h1 className="text-2xl font-bold text-gray-900">Blockchain Voting System</h1>
            
//             <div className="flex items-center space-x-4">
//               {connected ? (
//                 <>
//                   <span className="text-sm text-gray-600">
//                     Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
//                   </span>
//                   {isAdmin && (
//                     <button
//                       onClick={() => setCurrentView(currentView === 'admin' ? 'elections' : 'admin')}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
//                     >
//                       {currentView === 'admin' ? 'View Elections' : 'Admin Panel'}
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <button
//                   onClick={connectWallet}
//                   className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
//                 >
//                   Connect Wallet
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {!connected ? (
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               Welcome to Blockchain Voting
//             </h2>
//             <p className="text-gray-600 mb-8">
//               Connect your MetaMask wallet to start voting or managing elections
//             </p>
//             <button
//               onClick={connectWallet}
//               className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold"
//             >
//               Connect MetaMask
//             </button>
//           </div>
//         ) : currentView === 'admin' ? (
//           <AdminPanel onBack={() => setCurrentView('elections')} />
//         ) : currentView === 'details' ? (
//           <ElectionDetails 
//             election={selectedElection} 
//             onBack={handleBackToList}
//           />
//         ) : (
//           <ElectionList onViewElection={handleViewElection} />
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import ContractService from './ContractService';
// import AdminPanel from './AdminPanel';
// import ElectionList from './ElectionList';
// import ElectionDetails from './ElectionDetails';
// import VoterRegistration from './VoterRegistration';

// // Define the admin wallet address (use your main admin address)
// const ADMIN_WALLET_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

// function App() {
//   const [connected, setConnected] = useState(false);
//   const [account, setAccount] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [currentView, setCurrentView] = useState('elections');
//   const [selectedElection, setSelectedElection] = useState(null);
//   const [adminCheckLoading, setAdminCheckLoading] = useState(false);
  

//   const checkAdminPrivileges = async (walletAddress) => {
//     setAdminCheckLoading(true);
//     try {
//       // Check if connected wallet matches admin wallet
//       const isAdminWallet = walletAddress.toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase();
//       setIsAdmin(isAdminWallet);
      
//       if (!isAdminWallet) {
//         console.log(`Access denied: ${walletAddress} is not admin. Admin wallet: ${ADMIN_WALLET_ADDRESS}`);
//       }
//     } catch (error) {
//       console.error('Error checking admin privileges:', error);
//       setIsAdmin(false);
//     } finally {
//       setAdminCheckLoading(false);
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       const signer = await ContractService.connectWallet();
//       const address = await signer.getAddress();
//       setAccount(address);
//       setConnected(true);
      
//       // Check if user is admin
//       await checkAdminPrivileges(address);
//     } catch (error) {
//       console.error('Failed to connect wallet:', error);
//       alert('Failed to connect wallet: ' + error.message);
//     }
//   };

//   const handleViewElection = (election) => {
//     setSelectedElection(election);
//     setCurrentView('details');
//   };

//   const handleBackToList = () => {
//     setSelectedElection(null);
//     setCurrentView('elections');
//   };

//   // Auto-check admin privileges when account changes
//   useEffect(() => {
//     if (account) {
//       checkAdminPrivileges(account);
//     }
//   }, [account]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <h1 className="text-2xl font-bold text-gray-900">Blockchain Voting System</h1>
            
//             <div className="flex items-center space-x-4">
//               {connected ? (
//                 <>
//                   <div className="flex items-center space-x-3">
//                     <span className="text-sm text-gray-600">
//                       Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
//                     </span>
//                     {adminCheckLoading ? (
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
//                     ) : isAdmin ? (
//                       <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
//                         Admin
//                       </span>
//                     ) : (
//                       <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
//                         Voter
//                       </span>
//                     )}
//                   </div>
//                   {isAdmin && (
//                     <button
//                       onClick={() => setCurrentView(currentView === 'admin' ? 'elections' : 'admin')}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
//                     >
//                       {currentView === 'admin' ? 'View Elections' : 'Admin Panel'}
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <button
//                   onClick={connectWallet}
//                   className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
//                 >
//                   Connect Wallet
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {!connected ? (
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               Welcome to Blockchain Voting
//             </h2>
//             <p className="text-gray-600 mb-8">
//               Connect your MetaMask wallet to start voting or managing elections
//             </p>
//             <button
//               onClick={connectWallet}
//               className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold"
//             >
//               Connect MetaMask
//             </button>
//           </div>
//         ) : currentView === 'admin' ? (
//           isAdmin ? (
//             <AdminPanel onBack={() => setCurrentView('elections')} />
//           ) : (
//             <div className="text-center py-12">
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
//                 <h3 className="text-lg font-bold mb-2">🚫 Access Denied</h3>
//                 <p className="mb-4">You don't have admin privileges.</p>
//                 <p className="text-sm text-red-600">
//                   Connected: {account}<br />
//                   Admin wallet: {ADMIN_WALLET_ADDRESS}
//                 </p>
//                 <button
//                   onClick={() => setCurrentView('elections')}
//                   className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Back to Elections
//                 </button>
//               </div>
//             </div>
//           )
//         ) : currentView === 'details' ? (
//           <ElectionDetails 
//             election={selectedElection} 
//             onBack={handleBackToList}
//           />
//         ) : (
//           <ElectionList onViewElection={handleViewElection} />
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import ContractService from './ContractService';
import AdminPanel from './AdminPanel';
import ElectionList from './ElectionList';
import ElectionDetails from './ElectionDetails';
import VoterRegistration from './VoterRegistration';

// Define the admin wallet address (use your main admin address)
const ADMIN_WALLET_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

function App() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentView, setCurrentView] = useState('elections');
  const [selectedElection, setSelectedElection] = useState(null);
  const [adminCheckLoading, setAdminCheckLoading] = useState(false);

  const checkAdminPrivileges = async (walletAddress) => {
    setAdminCheckLoading(true);
    try {
      // Check if connected wallet matches admin wallet
      const isAdminWallet = walletAddress.toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase();
      setIsAdmin(isAdminWallet);
      
      if (!isAdminWallet) {
        console.log(`Access denied: ${walletAddress} is not admin. Admin wallet: ${ADMIN_WALLET_ADDRESS}`);
      }
    } catch (error) {
      console.error('Error checking admin privileges:', error);
      setIsAdmin(false);
    } finally {
      setAdminCheckLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      const signer = await ContractService.connectWallet();
      const address = await signer.getAddress();
      setAccount(address);
      setConnected(true);
      
      // Check if user is admin
      await checkAdminPrivileges(address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet: ' + error.message);
    }
  };

  const handleViewElection = (election) => {
    setSelectedElection(election);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setSelectedElection(null);
    setCurrentView('elections');
  };

  // Auto-check admin privileges when account changes
  useEffect(() => {
    if (account) {
      checkAdminPrivileges(account);
    }
  }, [account]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Blockchain Voting System</h1>
            
            <div className="flex items-center space-x-4">
              {connected ? (
                <>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
                    </span>
                    {adminCheckLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    ) : isAdmin ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Admin
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        Voter
                      </span>
                    )}
                  </div>
                  {isAdmin ? (
                    <button
                      onClick={() => setCurrentView(currentView === 'admin' ? 'elections' : 'admin')}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      {currentView === 'admin' ? 'View Elections' : 'Admin Panel'}
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentView(currentView === 'register' ? 'elections' : 'register')}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      {currentView === 'register' ? 'View Elections' : 'Register to Vote'}
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={connectWallet}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!connected ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Blockchain Voting
            </h2>
            <p className="text-gray-600 mb-8">
              Connect your MetaMask wallet to start voting or managing elections
            </p>
            <button
              onClick={connectWallet}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold"
            >
              Connect MetaMask
            </button>
          </div>
        ) : currentView === 'admin' ? (
          isAdmin ? (
            <AdminPanel onBack={() => setCurrentView('elections')} />
          ) : (
            <div className="text-center py-12">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
                <h3 className="text-lg font-bold mb-2">🚫 Access Denied</h3>
                <p className="mb-4">You don't have admin privileges.</p>
                <p className="text-sm text-red-600">
                  Connected: {account}<br />
                  Admin wallet: {ADMIN_WALLET_ADDRESS}
                </p>
                <button
                  onClick={() => setCurrentView('elections')}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Back to Elections
                </button>
              </div>
            </div>
          )
        ) : currentView === 'details' ? (
          <ElectionDetails 
            election={selectedElection} 
            onBack={handleBackToList}
          />
        ) : currentView === 'register' ? (
          <VoterRegistration onBack={() => setCurrentView('elections')} />
        ) : (
          <ElectionList onViewElection={handleViewElection} />
        )}
      </main>
    </div>
  );
}

export default App;