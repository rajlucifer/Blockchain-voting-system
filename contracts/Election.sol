
// // pragma solidity ^0.8.18;

// // contract Election {
// //     address public admin;
// //     string public electionName;
// //     bool public electionEnded;
// //     address public winner;
// //     uint256 public totalVotes;
    
// //     struct Candidate {
// //         uint256 id;
// //         string name;
// //         address candidateAddress;
// //         uint256 voteCount;
// //     }
    
// //     struct Voter {
// //         bool registered;
// //         bool voted;
// //         uint256 votedFor;
// //     }
    
// //     mapping(uint256 => Candidate) public candidates;
// //     mapping(address => Voter) public voters;
    
// //     uint256 public candidatesCount;
// //     uint256 public startTime;
// //     uint256 public endTime;
    
// //     event CandidateAdded(uint256 candidateId, string name, address candidateAddress);
// //     event VoterRegistered(address voter);
// //     event VoteCast(address voter, uint256 candidateId);
// //     event ElectionEnded();
// //     event WinnerDeclared(address winner, string winnerName, uint256 voteCount);
    
// //     modifier onlyAdmin() {
// //         require(msg.sender == admin, "Only admin can perform this action");
// //         _;
// //     }
    
// //     modifier electionActive() {
// //         require(block.timestamp >= startTime && block.timestamp <= endTime, "Election is not active");
// //         require(!electionEnded, "Election has ended");
// //         _;
// //     }
    
// //     constructor(
// //         string memory _electionName,
// //         uint256 _durationInHours,
// //         address _admin
// //     ) {
// //         admin = _admin;
// //         electionName = _electionName;
// //         startTime = block.timestamp;
// //         endTime = block.timestamp + (_durationInHours * 1 hours);
// //         electionEnded = false;
// //         candidatesCount = 0;
// //         totalVotes = 0;
// //     }
    
// //     function addCandidate(string memory _name, address _candidateAddress) external onlyAdmin {
// //         require(!electionEnded, "Election has ended");
// //         require(bytes(_name).length > 0, "Candidate name cannot be empty");
        
// //         candidatesCount++;
// //         candidates[candidatesCount] = Candidate({
// //             id: candidatesCount,
// //             name: _name,
// //             candidateAddress: _candidateAddress,
// //             voteCount: 0
// //         });
        
// //         emit CandidateAdded(candidatesCount, _name, _candidateAddress);
// //     }
    
// //     function registerVoter(address _voter) external onlyAdmin {
// //         require(!electionEnded, "Election has ended");
// //         require(!voters[_voter].registered, "Voter already registered");
        
// //         voters[_voter] = Voter({
// //             registered: true,
// //             voted: false,
// //             votedFor: 0
// //         });
        
// //         emit VoterRegistered(_voter);
// //     }
    
// //     function vote(uint256 _candidateId) external electionActive {
// //         require(voters[msg.sender].registered, "Voter not registered");
// //         require(!voters[msg.sender].voted, "Already voted");
// //         require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        
// //         voters[msg.sender].voted = true;
// //         voters[msg.sender].votedFor = _candidateId;
// //         candidates[_candidateId].voteCount++;
// //         totalVotes++;
        
// //         emit VoteCast(msg.sender, _candidateId);
// //     }
    
// //     function endElection() external onlyAdmin {
// //         require(!electionEnded, "Election already ended");
// //         require(block.timestamp > endTime, "Election time not completed");
        
// //         electionEnded = true;
// //         emit ElectionEnded();
// //     }
    
// //     function declareWinner() external onlyAdmin {
// //         require(electionEnded, "Election not ended yet");
// //         require(winner == address(0), "Winner already declared");
        
// //         uint256 winningVoteCount = 0;
// //         uint256 winningCandidateId = 0;
        
// //         for (uint256 i = 1; i <= candidatesCount; i++) {
// //             if (candidates[i].voteCount > winningVoteCount) {
// //                 winningVoteCount = candidates[i].voteCount;
// //                 winningCandidateId = i;
// //             }
// //         }
        
// //         require(winningCandidateId > 0, "No votes cast");
        
// //         winner = candidates[winningCandidateId].candidateAddress;
        
// //         emit WinnerDeclared(
// //             winner,
// //             candidates[winningCandidateId].name,
// //             winningVoteCount
// //         );
// //     }
    
// //     function getCandidate(uint256 _candidateId) external view returns (Candidate memory) {
// //         require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
// //         return candidates[_candidateId];
// //     }
    
// //     function getAllCandidates() external view returns (Candidate[] memory) {
// //         Candidate[] memory allCandidates = new Candidate[](candidatesCount);
// //         for (uint256 i = 0; i < candidatesCount; i++) {
// //             allCandidates[i] = candidates[i + 1];
// //         }
// //         return allCandidates;
// //     }
    
// //     function getVoterStatus(address _voter) external view returns (Voter memory) {
// //         return voters[_voter];
// //     }
    
// //     function isElectionActive() external view returns (bool) {
// //         return block.timestamp >= startTime && block.timestamp <= endTime && !electionEnded;
// //     }
// // }


// // pragma solidity ^0.8.18;

// // contract Election {
// //     address public admin;
// //     string public electionName;
// //     bool public electionEnded;
// //     address public winner;
// //     uint256 public totalVotes;
    
// //     struct Candidate {
// //         uint256 id;
// //         string name;
// //         address candidateAddress;
// //         uint256 voteCount;
// //     }
    
// //     struct Voter {
// //         bool registered;
// //         bool voted;
// //         uint256 votedFor;
// //     }
    
// //     mapping(uint256 => Candidate) public candidates;
// //     mapping(address => Voter) public voters;
    
// //     uint256 public candidatesCount;
// //     uint256 public startTime;
// //     uint256 public endTime;
    
// //     event CandidateAdded(uint256 candidateId, string name, address candidateAddress);
// //     event VoterRegistered(address voter);
// //     event VoteCast(address voter, uint256 candidateId);
// //     event ElectionEnded();
// //     event WinnerDeclared(address winner, string winnerName, uint256 voteCount);
    
// //     modifier onlyAdmin() {
// //         require(msg.sender == admin, "Only admin can perform this action");
// //         _;
// //     }
    
// //     modifier electionActive() {
// //         require(block.timestamp >= startTime && block.timestamp <= endTime, "Election is not active");
// //         require(!electionEnded, "Election has ended");
// //         _;
// //     }
    
// //     constructor(
// //         string memory _electionName,
// //         uint256 _durationInHours,
// //         address _admin
// //     ) {
// //         admin = _admin;
// //         electionName = _electionName;
// //         startTime = block.timestamp;
// //         endTime = block.timestamp + (_durationInHours * 1 hours);
// //         electionEnded = false;
// //         candidatesCount = 0;
// //         totalVotes = 0;
// //     }
    
// //     function addCandidate(string memory _name, address _candidateAddress) external onlyAdmin {
// //         require(!electionEnded, "Election has ended");
// //         require(bytes(_name).length > 0, "Candidate name cannot be empty");
        
// //         candidatesCount++;
// //         candidates[candidatesCount] = Candidate({
// //             id: candidatesCount,
// //             name: _name,
// //             candidateAddress: _candidateAddress,
// //             voteCount: 0
// //         });
        
// //         emit CandidateAdded(candidatesCount, _name, _candidateAddress);
// //     }
    
// //     function registerVoter(address _voter) external onlyAdmin {
// //         require(!electionEnded, "Election has ended");
// //         require(!voters[_voter].registered, "Voter already registered");
        
// //         voters[_voter] = Voter({
// //             registered: true,
// //             voted: false,
// //             votedFor: 0
// //         });
        
// //         emit VoterRegistered(_voter);
// //     }
    
// //     function vote(uint256 _candidateId) external electionActive {
// //         require(voters[msg.sender].registered, "Voter not registered");
// //         require(!voters[msg.sender].voted, "Already voted");
// //         require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        
// //         voters[msg.sender].voted = true;
// //         voters[msg.sender].votedFor = _candidateId;
// //         candidates[_candidateId].voteCount++;
// //         totalVotes++;
        
// //         emit VoteCast(msg.sender, _candidateId);
// //     }
    
// //     function endElection() external onlyAdmin {
// //         require(!electionEnded, "Election already ended");
// //         require(block.timestamp > endTime, "Election time not completed");
        
// //         electionEnded = true;
// //         emit ElectionEnded();
// //     }
    
// //     function declareWinner() external onlyAdmin {
// //         require(electionEnded, "Election not ended yet");
// //         require(winner == address(0), "Winner already declared");
        
// //         uint256 winningVoteCount = 0;
// //         uint256 winningCandidateId = 0;
        
// //         for (uint256 i = 1; i <= candidatesCount; i++) {
// //             if (candidates[i].voteCount > winningVoteCount) {
// //                 winningVoteCount = candidates[i].voteCount;
// //                 winningCandidateId = i;
// //             }
// //         }
        
// //         require(winningCandidateId > 0, "No votes cast");
        
// //         winner = candidates[winningCandidateId].candidateAddress;
        
// //         emit WinnerDeclared(
// //             winner,
// //             candidates[winningCandidateId].name,
// //             winningVoteCount
// //         );
// //     }
    
// //     function getCandidate(uint256 _candidateId) external view returns (Candidate memory) {
// //         require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
// //         return candidates[_candidateId];
// //     }
    
// //     function getAllCandidates() external view returns (Candidate[] memory) {
// //         Candidate[] memory allCandidates = new Candidate[](candidatesCount);
// //         for (uint256 i = 0; i < candidatesCount; i++) {
// //             allCandidates[i] = candidates[i + 1];
// //         }
// //         return allCandidates;
// //     }
    
// //     function getVoterStatus(address _voter) external view returns (Voter memory) {
// //         return voters[_voter];
// //     }
    
// //     function isElectionActive() external view returns (bool) {
// //         return block.timestamp >= startTime && block.timestamp <= endTime && !electionEnded;
// //     }
// // }


// // pragma solidity ^0.8.18;

// // contract Election {
// //     address public admin;
// //     string public electionName;
// //     bool public electionEnded;
// //     address public winner;
// //     uint256 public totalVotes;
    
// //     struct Candidate {
// //         uint256 id;
// //         string name;
// //         address candidateAddress;
// //         uint256 voteCount;
// //     }
    
// //     struct Voter {
// //         bool registered;
// //         bool voted;
// //         uint256 votedFor;
// //     }
    
// //     mapping(uint256 => Candidate) public candidates;
// //     mapping(address => Voter) public voters;
    
// //     uint256 public candidatesCount;
// //     uint256 public startTime;
// //     uint256 public endTime;
    
// //     event CandidateAdded(uint256 candidateId, string name, address candidateAddress);
// //     event VoterRegistered(address voter);
// //     event VoteCast(address voter, uint256 candidateId);
// //     event ElectionEnded();
// //     event WinnerDeclared(address winner, string winnerName, uint256 voteCount);
    
// //     modifier onlyAdmin() {
// //         require(msg.sender == admin, "Only admin can perform this action");
// //         _;
// //     }
    
// //     modifier electionActive() {
// //         require(block.timestamp >= startTime && block.timestamp <= endTime, "Election is not active");
// //         require(!electionEnded, "Election has ended");
// //         _;
// //     }
    
// //     modifier electionNotEnded() {
// //         require(!electionEnded, "Election has ended");
// //         _;
// //     }
    
// //     constructor(
// //         string memory _electionName,
// //         uint256 _durationInHours,
// //         address _admin
// //     ) {
// //         admin = _admin;
// //         electionName = _electionName;
// //         startTime = block.timestamp;
// //         endTime = block.timestamp + (_durationInHours * 1 hours);
// //         electionEnded = false;
// //         candidatesCount = 0;
// //         totalVotes = 0;
// //     }
    
// //     function addCandidate(string memory _name, address _candidateAddress) external onlyAdmin electionNotEnded {
// //         require(bytes(_name).length > 0, "Candidate name cannot be empty");
// //         require(_candidateAddress != address(0), "Candidate address cannot be zero");
        
// //         candidatesCount++;
// //         candidates[candidatesCount] = Candidate({
// //             id: candidatesCount,
// //             name: _name,
// //             candidateAddress: _candidateAddress,
// //             voteCount: 0
// //         });
        
// //         emit CandidateAdded(candidatesCount, _name, _candidateAddress);
// //     }
    
// //     function registerVoter(address _voter) external onlyAdmin electionNotEnded {
// //         require(_voter != address(0), "Voter address cannot be zero");
// //         require(!voters[_voter].registered, "Voter already registered");
        
// //         voters[_voter] = Voter({
// //             registered: true,
// //             voted: false,
// //             votedFor: 0
// //         });
        
// //         emit VoterRegistered(_voter);
// //     }
    
// //     function vote(uint256 _candidateId) external electionActive {
// //         require(voters[msg.sender].registered, "Voter not registered");
// //         require(!voters[msg.sender].voted, "Already voted");
// //         require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        
// //         voters[msg.sender].voted = true;
// //         voters[msg.sender].votedFor = _candidateId;
// //         candidates[_candidateId].voteCount++;
// //         totalVotes++;
        
// //         emit VoteCast(msg.sender, _candidateId);
// //     }
    
// //     function endElection() external onlyAdmin {
// //         require(!electionEnded, "Election already ended");
// //         require(block.timestamp > endTime, "Election time not completed");
        
// //         electionEnded = true;
// //         emit ElectionEnded();
// //     }
    
// //     function declareWinner() external onlyAdmin {
// //         require(electionEnded, "Election not ended yet");
// //         require(winner == address(0), "Winner already declared");
        
// //         uint256 winningVoteCount = 0;
// //         uint256 winningCandidateId = 0;
        
// //         for (uint256 i = 1; i <= candidatesCount; i++) {
// //             if (candidates[i].voteCount > winningVoteCount) {
// //                 winningVoteCount = candidates[i].voteCount;
// //                 winningCandidateId = i;
// //             }
// //         }
        
// //         require(winningCandidateId > 0, "No votes cast");
        
// //         winner = candidates[winningCandidateId].candidateAddress;
        
// //         emit WinnerDeclared(
// //             winner,
// //             candidates[winningCandidateId].name,
// //             winningVoteCount
// //         );
// //     }
    
// //     function getCandidate(uint256 _candidateId) external view returns (uint256, string memory, address, uint256) {
// //         require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
// //         Candidate memory candidate = candidates[_candidateId];
// //         return (candidate.id, candidate.name, candidate.candidateAddress, candidate.voteCount);
// //     }
    
// //     function getAllCandidates() external view returns (Candidate[] memory) {
// //         Candidate[] memory allCandidates = new Candidate[](candidatesCount);
// //         for (uint256 i = 0; i < candidatesCount; i++) {
// //             allCandidates[i] = candidates[i + 1];
// //         }
// //         return allCandidates;
// //     }
    
// //     function getVoterStatus(address _voter) external view returns (bool, bool, uint256) {
// //         Voter memory voter = voters[_voter];
// //         return (voter.registered, voter.voted, voter.votedFor);
// //     }
    
// //     function isElectionActive() external view returns (bool) {
// //         return block.timestamp >= startTime && block.timestamp <= endTime && !electionEnded;
// //     }

    
// // }


 
// // pragma solidity ^0.8.18;

// // contract Election {
// //     address public admin;
// //     string public electionName;
// //     bool public electionEnded;
// //     address public winner;
// //     uint256 public totalVotes;
    
// //     struct Candidate {
// //         uint256 id;
// //         string name;
// //         address candidateAddress;
// //         uint256 voteCount;
// //     }
    
// //     struct Voter {
// //         bool registered;
// //         bool voted;
// //         uint256 votedFor;
// //     }
    
// //     mapping(uint256 => Candidate) public candidates;
// //     mapping(address => Voter) public voters;
    
// //     uint256 public candidatesCount;
// //     uint256 public startTime;
// //     uint256 public endTime;
    
// //     event CandidateAdded(uint256 candidateId, string name, address candidateAddress);
// //     event VoterRegistered(address voter);
// //     event VoteCast(address voter, uint256 candidateId);
// //     event ElectionEnded();
// //     event WinnerDeclared(address winner, string winnerName, uint256 voteCount);
    
// //     modifier onlyAdmin() {
// //         require(msg.sender == admin, "Only admin can perform this action");
// //         _;
// //     }
    
// //     modifier electionActive() {
// //         require(block.timestamp >= startTime && block.timestamp <= endTime, "Election is not active");
// //         require(!electionEnded, "Election has ended");
// //         _;
// //     }
    
// //     modifier electionNotEnded() {
// //         require(!electionEnded, "Election has ended");
// //         _;
// //     }
    
// //     constructor(
// //         string memory _electionName,
// //         uint256 _durationInHours,
// //         address _admin
// //     ) {
// //         admin = _admin;
// //         electionName = _electionName;
// //         startTime = block.timestamp;
// //         endTime = block.timestamp + (_durationInHours * 1 hours);
// //         electionEnded = false;
// //         candidatesCount = 0;
// //         totalVotes = 0;
// //     }
    
// //     function addCandidate(string memory _name, address _candidateAddress) external onlyAdmin electionNotEnded {
// //         require(bytes(_name).length > 0, "Candidate name cannot be empty");
// //         require(_candidateAddress != address(0), "Candidate address cannot be zero");
        
// //         candidatesCount++;
// //         candidates[candidatesCount] = Candidate({
// //             id: candidatesCount,
// //             name: _name,
// //             candidateAddress: _candidateAddress,
// //             voteCount: 0
// //         });
        
// //         emit CandidateAdded(candidatesCount, _name, _candidateAddress);
// //     }
    
// //     function registerVoter(address _voter) external onlyAdmin electionNotEnded {
// //         require(_voter != address(0), "Voter address cannot be zero");
// //         require(!voters[_voter].registered, "Voter already registered");
        
// //         voters[_voter] = Voter({
// //             registered: true,
// //             voted: false,
// //             votedFor: 0
// //         });
        
// //         emit VoterRegistered(_voter);
// //     }
    
// //     function vote(uint256 _candidateId) external electionActive {
// //         require(voters[msg.sender].registered, "Voter not registered");
// //         require(!voters[msg.sender].voted, "Already voted");
// //         require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        
// //         voters[msg.sender].voted = true;
// //         voters[msg.sender].votedFor = _candidateId;
// //         candidates[_candidateId].voteCount++;
// //         totalVotes++;
        
// //         emit VoteCast(msg.sender, _candidateId);
// //     }
    
// //     // Admin can end election anytime (removed time restriction)
// //     function endElection() external onlyAdmin {
// //         require(!electionEnded, "Election already ended");
        
// //         electionEnded = true;
// //         emit ElectionEnded();
// //     }
    
// //     // Admin can declare winner after election has ended
// //     function declareWinner() external onlyAdmin {
// //         require(electionEnded, "Election not ended yet");
// //         require(winner == address(0), "Winner already declared");
// //         require(candidatesCount > 0, "No candidates in election");
        
// //         uint256 winningVoteCount = 0;
// //         uint256 winningCandidateId = 0;
// //         bool hasTie = false;
        
// //         for (uint256 i = 1; i <= candidatesCount; i++) {
// //             if (candidates[i].voteCount > winningVoteCount) {
// //                 winningVoteCount = candidates[i].voteCount;
// //                 winningCandidateId = i;
// //                 hasTie = false;
// //             } else if (candidates[i].voteCount == winningVoteCount && winningVoteCount > 0) {
// //                 hasTie = true;
// //             }
// //         }
        
// //         require(winningCandidateId > 0, "No votes cast or no candidates");
        
// //         if (hasTie) {
// //             // In case of tie, the first candidate with highest votes wins
// //             // You can modify this logic as needed
// //             for (uint256 i = 1; i <= candidatesCount; i++) {
// //                 if (candidates[i].voteCount == winningVoteCount) {
// //                     winningCandidateId = i;
// //                     break;
// //                 }
// //             }
// //         }
        
// //         winner = candidates[winningCandidateId].candidateAddress;
        
// //         emit WinnerDeclared(
// //             winner,
// //             candidates[winningCandidateId].name,
// //             winningVoteCount
// //         );
// //     }
    
// //     function getCandidate(uint256 _candidateId) external view returns (uint256, string memory, address, uint256) {
// //         require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
// //         Candidate memory candidate = candidates[_candidateId];
// //         return (candidate.id, candidate.name, candidate.candidateAddress, candidate.voteCount);
// //     }
    
// //     function getAllCandidates() external view returns (Candidate[] memory) {
// //         Candidate[] memory allCandidates = new Candidate[](candidatesCount);
// //         for (uint256 i = 0; i < candidatesCount; i++) {
// //             allCandidates[i] = candidates[i + 1];
// //         }
// //         return allCandidates;
// //     }
    
// //     function getVoterStatus(address _voter) external view returns (bool, bool, uint256) {
// //         Voter memory voter = voters[_voter];
// //         return (voter.registered, voter.voted, voter.votedFor);
// //     }
    
// //     function isElectionActive() external view returns (bool) {
// //         return block.timestamp >= startTime && block.timestamp <= endTime && !electionEnded;
// //     }
    
// //     // Emergency function to extend election time (admin only)
// //     function extendElection(uint256 _additionalHours) external onlyAdmin {
// //         require(!electionEnded, "Election has ended");
// //         endTime += (_additionalHours * 1 hours);
// //     }
// // }



 
// pragma solidity ^0.8.18;

// contract Election {
//     address public admin;
//     string public electionName;
//     bool public electionEnded;
//     address public winner;
//     string public winnerName;
//     uint256 public winnerVoteCount;
//     uint256 public totalVotes;
    
//     struct Candidate {
//         uint256 id;
//         string name;
//         address candidateAddress;
//         uint256 voteCount;
//     }
    
//     struct Voter {
//         bool registered;
//         bool voted;
//         uint256 votedFor;
//     }
    
//     mapping(uint256 => Candidate) public candidates;
//     mapping(address => Voter) public voters;
//     mapping(string => bool) private candidateNameExists;
//     mapping(address => bool) private candidateAddressExists;
    
//     uint256 public candidatesCount;
//     uint256 public startTime;
//     uint256 public endTime;
    
//     event CandidateAdded(uint256 candidateId, string name, address candidateAddress);
//     event VoterRegistered(address voter);
//     event VoteCast(address voter, uint256 candidateId);
//     event ElectionEnded();
//     event WinnerDeclared(address winner, string winnerName, uint256 voteCount);
    
//     modifier onlyAdmin() {
//         require(msg.sender == admin, "Only admin can perform this action");
//         _;
//     }
    
//     modifier electionActive() {
//         require(block.timestamp >= startTime && block.timestamp <= endTime, "Election is not active");
//         require(!electionEnded, "Election has ended");
//         _;
//     }
    
//     modifier electionNotEnded() {
//         require(!electionEnded, "Election has ended");
//         _;
//     }
    
//     constructor(
//         string memory _electionName,
//         uint256 _durationInHours,
//         address _admin
//     ) {
//         admin = _admin;
//         electionName = _electionName;
//         startTime = block.timestamp;
//         endTime = block.timestamp + (_durationInHours * 1 hours);
//         electionEnded = false;
//         candidatesCount = 0;
//         totalVotes = 0;
//         winner = address(0);
//         winnerName = "";
//         winnerVoteCount = 0;
//     }
    
//     function addCandidate(string memory _name, address _candidateAddress) external onlyAdmin electionNotEnded {
//         require(bytes(_name).length > 0, "Candidate name cannot be empty");
//         require(_candidateAddress != address(0), "Candidate address cannot be zero");
//         require(!candidateNameExists[_name], "Candidate name already exists");
//         require(!candidateAddressExists[_candidateAddress], "Candidate address already exists");
        
//         candidatesCount++;
//         candidates[candidatesCount] = Candidate({
//             id: candidatesCount,
//             name: _name,
//             candidateAddress: _candidateAddress,
//             voteCount: 0
//         });
        
//         // Mark name and address as used
//         candidateNameExists[_name] = true;
//         candidateAddressExists[_candidateAddress] = true;
        
//         emit CandidateAdded(candidatesCount, _name, _candidateAddress);
//     }
    
//     function registerVoter(address _voter) external onlyAdmin electionNotEnded {
//         require(_voter != address(0), "Voter address cannot be zero");
//         require(!voters[_voter].registered, "Voter already registered");
        
//         voters[_voter] = Voter({
//             registered: true,
//             voted: false,
//             votedFor: 0
//         });
        
//         emit VoterRegistered(_voter);
//     }
    
//     function vote(uint256 _candidateId) external electionActive {
//         require(voters[msg.sender].registered, "Voter not registered");
//         require(!voters[msg.sender].voted, "Already voted");
//         require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        
//         voters[msg.sender].voted = true;
//         voters[msg.sender].votedFor = _candidateId;
//         candidates[_candidateId].voteCount++;
//         totalVotes++;
        
//         emit VoteCast(msg.sender, _candidateId);
//     }
    
//     // Admin can end election anytime (removed time restriction)
//     function endElection() external onlyAdmin {
//         require(!electionEnded, "Election already ended");
        
//         electionEnded = true;
//         emit ElectionEnded();
//     }
    
//     // Admin can declare winner after election has ended
//     function declareWinner() external onlyAdmin {
//         require(electionEnded, "Election not ended yet");
//         require(winner == address(0), "Winner already declared");
//         require(candidatesCount > 0, "No candidates in election");
        
//         uint256 winningVoteCount = 0;
//         uint256 winningCandidateId = 0;
//         bool hasTie = false;
        
//         for (uint256 i = 1; i <= candidatesCount; i++) {
//             if (candidates[i].voteCount > winningVoteCount) {
//                 winningVoteCount = candidates[i].voteCount;
//                 winningCandidateId = i;
//                 hasTie = false;
//             } else if (candidates[i].voteCount == winningVoteCount && winningVoteCount > 0) {
//                 hasTie = true;
//             }
//         }
        
//         require(winningCandidateId > 0, "No votes cast or no candidates");
        
//         if (hasTie) {
//             // In case of tie, the first candidate with highest votes wins
//             for (uint256 i = 1; i <= candidatesCount; i++) {
//                 if (candidates[i].voteCount == winningVoteCount) {
//                     winningCandidateId = i;
//                     break;
//                 }
//             }
//         }
        
//         winner = candidates[winningCandidateId].candidateAddress;
//         winnerName = candidates[winningCandidateId].name;
//         winnerVoteCount = winningVoteCount;
        
//         emit WinnerDeclared(
//             winner,
//             winnerName,
//             winningVoteCount
//         );
//     }
    
//     function getCandidate(uint256 _candidateId) external view returns (uint256, string memory, address, uint256) {
//         require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
//         Candidate memory candidate = candidates[_candidateId];
//         return (candidate.id, candidate.name, candidate.candidateAddress, candidate.voteCount);
//     }
    
//     function getAllCandidates() external view returns (Candidate[] memory) {
//         Candidate[] memory allCandidates = new Candidate[](candidatesCount);
//         for (uint256 i = 0; i < candidatesCount; i++) {
//             allCandidates[i] = candidates[i + 1];
//         }
//         return allCandidates;
//     }
    
//     function getVoterStatus(address _voter) external view returns (bool, bool, uint256) {
//         Voter memory voter = voters[_voter];
//         return (voter.registered, voter.voted, voter.votedFor);
//     }
    
//     function isElectionActive() external view returns (bool) {
//         return block.timestamp >= startTime && block.timestamp <= endTime && !electionEnded;
//     }
    
//     // Get winner details
//     function getWinnerDetails() external view returns (address, string memory, uint256) {
//         return (winner, winnerName, winnerVoteCount);
//     }
    
//     // Check if candidate name exists
//     function isCandidateNameExists(string memory _name) external view returns (bool) {
//         return candidateNameExists[_name];
//     }
    
//     // Check if candidate address exists
//     function isCandidateAddressExists(address _candidateAddress) external view returns (bool) {
//         return candidateAddressExists[_candidateAddress];
//     }
    
//     // Emergency function to extend election time (admin only)
//     function extendElection(uint256 _additionalHours) external onlyAdmin {
//         require(!electionEnded, "Election has ended");
//         endTime += (_additionalHours * 1 hours);
//     }
// }



// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Election {
    address public admin;
    string public electionName;
    bool public electionEnded;
    address public winner;
    string public winnerName;
    uint256 public winnerVoteCount;
    uint256 public totalVotes;
    
    struct Candidate {
        uint256 id;
        string name;
        address candidateAddress;
        uint256 voteCount;
    }
    
    struct Voter {
        bool registered;
        bool voted;
        uint256 votedFor;
    }
    
    struct RegistrationRequest {
        address voterAddress;
        string voterName;
        bool approved;
        uint256 requestTime;
    }
    
    mapping(uint256 => Candidate) public candidates;
    mapping(address => Voter) public voters;
    mapping(address => RegistrationRequest) public registrationRequests;
    mapping(string => bool) private candidateNameExists;
    mapping(address => bool) private candidateAddressExists;
    
    uint256 public candidatesCount;
    uint256 public startTime;
    uint256 public endTime;
    address[] public pendingRequests;
    
    event CandidateAdded(uint256 candidateId, string name, address candidateAddress);
    event VoterRegistered(address voter);
    event VoteCast(address voter, uint256 candidateId);
    event ElectionEnded();
    event WinnerDeclared(address winner, string winnerName, uint256 voteCount);
    event RegistrationRequested(address voter, string voterName);
    event RegistrationApproved(address voter);
    event RegistrationRejected(address voter);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier electionActive() {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Election is not active");
        require(!electionEnded, "Election has ended");
        _;
    }
    
    modifier electionNotEnded() {
        require(!electionEnded, "Election has ended");
        _;
    }
    
    constructor(
        string memory _electionName,
        uint256 _durationInHours,
        address _admin
    ) {
        admin = _admin;
        electionName = _electionName;
        startTime = block.timestamp;
        endTime = block.timestamp + (_durationInHours * 1 hours);
        electionEnded = false;
        candidatesCount = 0;
        totalVotes = 0;
        winner = address(0);
        winnerName = "";
        winnerVoteCount = 0;
    }
    
    // Voter requests to register for this election
    function requestRegistration(string memory _voterName) external electionNotEnded {
        require(bytes(_voterName).length > 0, "Voter name cannot be empty");
        require(!voters[msg.sender].registered, "Already registered");
        require(registrationRequests[msg.sender].voterAddress == address(0), "Registration already requested");
        
        registrationRequests[msg.sender] = RegistrationRequest({
            voterAddress: msg.sender,
            voterName: _voterName,
            approved: false,
            requestTime: block.timestamp
        });
        
        pendingRequests.push(msg.sender);
        
        emit RegistrationRequested(msg.sender, _voterName);
    }
    
    // Admin approves voter registration
    function approveRegistration(address _voter) external onlyAdmin electionNotEnded {
        require(registrationRequests[_voter].voterAddress != address(0), "No registration request found");
        require(!registrationRequests[_voter].approved, "Registration already approved");
        require(!voters[_voter].registered, "Voter already registered");
        
        registrationRequests[_voter].approved = true;
        voters[_voter] = Voter({
            registered: true,
            voted: false,
            votedFor: 0
        });
        
        // Remove from pending requests
        for (uint i = 0; i < pendingRequests.length; i++) {
            if (pendingRequests[i] == _voter) {
                pendingRequests[i] = pendingRequests[pendingRequests.length - 1];
                pendingRequests.pop();
                break;
            }
        }
        
        emit RegistrationApproved(_voter);
        emit VoterRegistered(_voter);
    }
    
    // Admin rejects voter registration
    function rejectRegistration(address _voter) external onlyAdmin {
        require(registrationRequests[_voter].voterAddress != address(0), "No registration request found");
        
        // Remove from pending requests
        for (uint i = 0; i < pendingRequests.length; i++) {
            if (pendingRequests[i] == _voter) {
                pendingRequests[i] = pendingRequests[pendingRequests.length - 1];
                pendingRequests.pop();
                break;
            }
        }
        
        delete registrationRequests[_voter];
        
        emit RegistrationRejected(_voter);
    }
    
    function addCandidate(string memory _name, address _candidateAddress) external onlyAdmin electionNotEnded {
        require(bytes(_name).length > 0, "Candidate name cannot be empty");
        require(_candidateAddress != address(0), "Candidate address cannot be zero");
        require(!candidateNameExists[_name], "Candidate name already exists");
        require(!candidateAddressExists[_candidateAddress], "Candidate address already exists");
        
        candidatesCount++;
        candidates[candidatesCount] = Candidate({
            id: candidatesCount,
            name: _name,
            candidateAddress: _candidateAddress,
            voteCount: 0
        });
        
        candidateNameExists[_name] = true;
        candidateAddressExists[_candidateAddress] = true;
        
        emit CandidateAdded(candidatesCount, _name, _candidateAddress);
    }
    
    // Direct voter registration by admin (backward compatibility)
    function registerVoter(address _voter) external onlyAdmin electionNotEnded {
        require(_voter != address(0), "Voter address cannot be zero");
        require(!voters[_voter].registered, "Voter already registered");
        
        voters[_voter] = Voter({
            registered: true,
            voted: false,
            votedFor: 0
        });
        
        emit VoterRegistered(_voter);
    }
    
    function vote(uint256 _candidateId) external electionActive {
        require(voters[msg.sender].registered, "Voter not registered");
        require(!voters[msg.sender].voted, "Already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        
        voters[msg.sender].voted = true;
        voters[msg.sender].votedFor = _candidateId;
        candidates[_candidateId].voteCount++;
        totalVotes++;
        
        emit VoteCast(msg.sender, _candidateId);
    }
    
    function endElection() external onlyAdmin {
        require(!electionEnded, "Election already ended");
        
        electionEnded = true;
        emit ElectionEnded();
    }
    
    function declareWinner() external onlyAdmin {
        require(electionEnded, "Election not ended yet");
        require(winner == address(0), "Winner already declared");
        require(candidatesCount > 0, "No candidates in election");
        
        uint256 winningVoteCount = 0;
        uint256 winningCandidateId = 0;
        bool hasTie = false;
        
        for (uint256 i = 1; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winningCandidateId = i;
                hasTie = false;
            } else if (candidates[i].voteCount == winningVoteCount && winningVoteCount > 0) {
                hasTie = true;
            }
        }
        
        require(winningCandidateId > 0, "No votes cast or no candidates");
        
        if (hasTie) {
            for (uint256 i = 1; i <= candidatesCount; i++) {
                if (candidates[i].voteCount == winningVoteCount) {
                    winningCandidateId = i;
                    break;
                }
            }
        }
        
        winner = candidates[winningCandidateId].candidateAddress;
        winnerName = candidates[winningCandidateId].name;
        winnerVoteCount = winningVoteCount;
        
        emit WinnerDeclared(winner, winnerName, winningVoteCount);
    }
    
    function getCandidate(uint256 _candidateId) external view returns (uint256, string memory, address, uint256) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.candidateAddress, candidate.voteCount);
    }
    
    function getAllCandidates() external view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);
        for (uint256 i = 0; i < candidatesCount; i++) {
            allCandidates[i] = candidates[i + 1];
        }
        return allCandidates;
    }
    
    function getVoterStatus(address _voter) external view returns (bool, bool, uint256) {
        Voter memory voter = voters[_voter];
        return (voter.registered, voter.voted, voter.votedFor);
    }
    
    function getRegistrationRequest(address _voter) external view returns (address, string memory, bool, uint256) {
        RegistrationRequest memory request = registrationRequests[_voter];
        return (request.voterAddress, request.voterName, request.approved, request.requestTime);
    }
    
    function getPendingRequests() external view returns (address[] memory) {
        return pendingRequests;
    }
    
    function isElectionActive() external view returns (bool) {
        return block.timestamp >= startTime && block.timestamp <= endTime && !electionEnded;
    }
    
    function getWinnerDetails() external view returns (address, string memory, uint256) {
        return (winner, winnerName, winnerVoteCount);
    }
    
    function isCandidateNameExists(string memory _name) external view returns (bool) {
        return candidateNameExists[_name];
    }
    
    function isCandidateAddressExists(address _candidateAddress) external view returns (bool) {
        return candidateAddressExists[_candidateAddress];
    }
    
    function extendElection(uint256 _additionalHours) external onlyAdmin {
        require(!electionEnded, "Election has ended");
        endTime += (_additionalHours * 1 hours);
    }
}