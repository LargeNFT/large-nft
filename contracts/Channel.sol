// contracts/Channel.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "./util/console.sol";

contract Channel is ERC721Enumerable, Ownable {

    string private _ipfsCid;

    uint256 private _mintFee;

    uint256 private _maxTokenId;

    constructor(string memory name, string memory symbol, uint256 mintFee, uint256 maxTokenId) ERC721(name, symbol) {
        _mintFee = mintFee;
        _maxTokenId = maxTokenId;
    }

    function activate(string calldata ipfsCid) external onlyOwner {
        require(bytes(_ipfsCid).length == 0, "Already active");
        _ipfsCid = ipfsCid;
    }

    function mint(uint256 tokenId) public payable {

        /**
        Checks
         */

        //Make sure we are active
        require(bytes(_ipfsCid).length > 0, "Inactive");

        //Validate tokenId is in range
        require(tokenId > 0 && tokenId <= _maxTokenId, "Invalid token");

        //Make sure this one hasn't been minted
        require(_exists(tokenId) == false, "Exists");

        //Validate we have enough ETH. 
        require(msg.value == _mintFee, "Send exact ETH");

        //Mint
        _safeMint(_msgSender(), tokenId, "");

    }


    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        
        require(bytes(_ipfsCid).length > 0, "Not active");

        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return string(abi.encodePacked("ipfs://", _ipfsCid, "/", uint2str(tokenId), ".json"));
    
    }


    function withdraw() public payable onlyOwner {

        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success);

    }



    function uint2str(uint _i) public pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }



}