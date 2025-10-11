
// pragma solidity ^0.8.18;

// import "./Election.sol";

// contract ElectionFactory {
//     address public owner;
//     Election[] public elections;
    
//     event ElectionCreated(address indexed electionAddress, string name, address admin);
    
//     constructor() {
//         owner = msg.sender;
//     }
    
//     function createElection(
//         string memory _electionName,
//         uint256 _durationInHours
//     ) external returns (address) {
//         Election newElection = new Election(
//             _electionName,
//             _durationInHours,
//             msg.sender
//         );
        
//         elections.push(newElection);
        
//         emit ElectionCreated(
//             address(newElection),
//             _electionName,
//             msg.sender
//         );
        
//         return address(newElection);
//     }
    
//     function getAllElections() external view returns (Election[] memory) {
//         return elections;
//     }
    
//     function getElectionsCount() external view returns (uint256) {
//         return elections.length;
//     }
// }


 
// pragma solidity ^0.8.18;

// import "./Election.sol";

// contract ElectionFactory {
//     address public owner;
//     Election[] public elections;
    
//     event ElectionCreated(address indexed electionAddress, string name, address admin);
    
//     constructor() {
//         owner = msg.sender;
//     }
    
//     function createElection(
//         string memory _electionName,
//         uint256 _durationInHours
//     ) external returns (address) {
//         Election newElection = new Election(
//             _electionName,
//             _durationInHours,
//             msg.sender
//         );
        
//         elections.push(newElection);
        
//         emit ElectionCreated(
//             address(newElection),
//             _electionName,
//             msg.sender
//         );
        
//         return address(newElection);
//     }
    
//     function getAllElections() external view returns (Election[] memory) {
//         return elections;
//     }
    
//     function getElectionsCount() external view returns (uint256) {
//         return elections.length;
//     }
// }


 
// pragma solidity ^0.8.18;

// import "./Election.sol";

// contract ElectionFactory {
//     address public owner;
//     address[] public elections;
    
//     event ElectionCreated(address indexed electionAddress, string name, address admin);
    
//     constructor() {
//         owner = msg.sender;
//     }
    
//     function createElection(
//         string memory _electionName,
//         uint256 _durationInHours
//     ) external returns (address) {
//         Election newElection = new Election(
//             _electionName,
//             _durationInHours,
//             msg.sender
//         );
        
//         address electionAddress = address(newElection);
//         elections.push(electionAddress);
        
//         emit ElectionCreated(
//             electionAddress,
//             _electionName,
//             msg.sender
//         );
        
//         return electionAddress;
//     }
    
//     function getAllElections() external view returns (address[] memory) {
//         return elections;
//     }
    
//     function getElectionsCount() external view returns (uint256) {
//         return elections.length;
//     }
// }

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Election.sol";

contract ElectionFactory {
    address public owner;
    address[] public elections;
    mapping(string => bool) public electionNameExists;
    mapping(address => string) public electionNames;
    
    event ElectionCreated(address indexed electionAddress, string name, address admin);
    
    constructor() {
        owner = msg.sender;
    }
    
    function createElection(
        string memory _electionName,
        uint256 _durationInHours
    ) external returns (address) {
        require(bytes(_electionName).length > 0, "Election name cannot be empty");
        require(!electionNameExists[_electionName], "Election name already exists");
        
        Election newElection = new Election(
            _electionName,
            _durationInHours,
            msg.sender
        );
        
        address electionAddress = address(newElection);
        elections.push(electionAddress);
        
        // Mark election name as used
        electionNameExists[_electionName] = true;
        electionNames[electionAddress] = _electionName;
        
        emit ElectionCreated(
            electionAddress,
            _electionName,
            msg.sender
        );
        
        return electionAddress;
    }
    
    function getAllElections() external view returns (address[] memory) {
        return elections;
    }
    
    function getElectionsCount() external view returns (uint256) {
        return elections.length;
    }
    
    function isElectionNameExists(string memory _electionName) external view returns (bool) {
        return electionNameExists[_electionName];
    }
    
    function getElectionName(address _electionAddress) external view returns (string memory) {
        return electionNames[_electionAddress];
    }
}