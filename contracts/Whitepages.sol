pragma solidity 0.8.11;

contract Whitepages {

    event ListingEvent (
        address owner,
        string orbitCid,
        string eventType
    );

    address[] private addresses;

    //Records are ultimately stored mapped by their id.
    mapping(address => string) private listingMap;


    function create(string calldata _orbitCid) external {
        require(bytes(_orbitCid).length > 0, "You must supply an orbitCid");

        string memory existing = listingMap[msg.sender];
        require(bytes(existing).length == 0, "Address already exists");

        listingMap[msg.sender] = _orbitCid;

        //Put id in indexes
        addresses.push(msg.sender);

        emit ListingEvent(
            msg.sender,
            _orbitCid,
            "NEW"
        );

    }

    function read(address _address) public view returns (string memory orbitCid) {

        require(_address != address(0), "You must supply an address");

        string storage _orbitCid = listingMap[_address];

        return (_orbitCid);
    }

    function update(string calldata _orbitCid) external {

        require(bytes(_orbitCid).length > 0, "You must supply an orbitCid");

        string storage _existing = listingMap[msg.sender];

        if (keccak256(bytes(_existing)) != keccak256(bytes(_orbitCid))) {
            listingMap[msg.sender] = _orbitCid;

            emit ListingEvent(
                msg.sender,
                _orbitCid,
                "UPDATE"
            );
        }
    }

    function count() external view returns (uint256 theCount) {
        return addresses.length;
    }

    function readByIndex(uint256 _index) external view returns (address owner, string memory orbitCid) {

        require(_index >= 0, "You must supply an index");

        address _address = addresses[_index];

        string storage _existing = listingMap[_address];

        return (_address, _existing);
    }

}


