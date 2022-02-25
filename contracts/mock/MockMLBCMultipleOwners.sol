// contracts/mock/MockMLBC.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "../external/MLBC.sol";

contract MockMLBCMultipleOwners is MLBC {

    address owner1;
    address owner2;

    constructor(address _owner1, address _owner2) {
        owner1 = _owner1;
        owner2 = _owner2;
    }

    function exists(uint256 _tokenId) public pure override returns (bool _exists) {

        if (_tokenId > 249172) {
            _exists = false;    
        } else {
            _exists = true;
        }

    }

    function ownerOf(uint256 _tokenId) external view override returns (address _owner) {

        if (_tokenId < 50 || (_tokenId >= 1000 && _tokenId < 2000)) { 
            _owner = owner1; 
        }

        if (_tokenId >=2000) {
            _owner = owner2;
        }
    }
    
}