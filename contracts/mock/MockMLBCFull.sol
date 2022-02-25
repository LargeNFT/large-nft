// contracts/mock/MockMLBC.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "../external/MLBC.sol";

contract MockMLBCFull is MLBC {

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
        _owner = owner;
    }
    
    function tokensOfOwner(address _owner) external view returns(uint256[] memory result) {

        result = new uint256[](7000);

        uint256 resultIndex = 0;

        // We count on the fact that all Collectible have IDs starting at 0 and increasing
        // sequentially up to the total count.
        uint256 _assetId;

        for (_assetId = 0; _assetId < 3000; _assetId++) {
            result[resultIndex] = _assetId;
            resultIndex++;
        }
    }

}