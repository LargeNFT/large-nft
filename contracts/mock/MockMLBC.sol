// contracts/mock/MockMLBC.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "../external/MLBC.sol";

contract MockMLBC is MLBC {

    address owner;

    constructor(address _owner) {
        owner = _owner;
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
            _owner = owner; 
        }
    }
    
}