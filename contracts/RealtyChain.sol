// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract RealtyChain {
    // Define the events
    event AssetListed(string assetId, address indexed seller, uint price, string metadata);
    event AssetBought(string assetId, address indexed seller, address indexed buyer, uint price, string metadata);
    event AssetDelisted(string assetId, address indexed seller, uint price, string metadata);

    // Define the listing status enum
    enum ListingStatus { active_0, sold_1, cancelled_2 }

    // Define the asset struct
    struct Asset {
        ListingStatus status;
        string assetId;
        uint price;
        address owner;
        string metadata;
        address seller;
    }

    // Define contract admin and listings mapping
    address private admin;
    mapping(string => Asset) private listings;
    string[] private assetIds;

    // Define the seller modifier
    modifier isSeller(string memory _assetId) {
        Asset memory listing = listings[_assetId];
        require(msg.sender == listing.seller || msg.sender == admin, "Only sellers and admin have the right to delist a listed Asset");
        _;
    }

    constructor() payable {
        admin = msg.sender;
    }

    function getListing(string memory _assetId) public view returns (bool, Asset memory) {
        return (bytes(listings[_assetId].assetId).length > 0, listings[_assetId]);
    }

    function listAsset(string memory _assetId, uint _price, string memory _metadata) external {
        require(_price != 0, "Price cannot be 0");

        Asset memory listing = Asset(ListingStatus.active_0, _assetId, _price, msg.sender, _metadata, msg.sender);
        listings[_assetId] = listing;
        assetIds.push(_assetId);

        emit AssetListed(listing.assetId, listing.seller, listing.price, listing.metadata);
    }

    function buyAsset(string memory _assetId) external payable {
        Asset storage listing = listings[_assetId];
        require(msg.sender != listing.seller, "Seller cannot buy their own asset");
        require(listing.status == ListingStatus.active_0, "Only active properties can be bought");
        require(msg.value >= listing.price, "Insufficient funds");

        transferOwnership(listing, msg.sender);
        payable(listing.seller).transfer(listing.price);

        emit AssetBought(listing.assetId, listing.seller, msg.sender, listing.price, listing.metadata);
    }

    function delistAsset(string memory _assetId) external isSeller(_assetId) {
        Asset storage listing = listings[_assetId];
        require(listing.status == ListingStatus.active_0, "If status != active_0, then can't cancel");
        listing.status = ListingStatus.cancelled_2;

        emit AssetDelisted(listing.assetId, listing.seller, listing.price, listing.metadata);
    }

    function transferOwnership(Asset storage _listing, address _newOwner) private {
        _listing.owner = _newOwner;
        _listing.status = ListingStatus.sold_1;
        _listing.seller = address(0);
    }

    function getAllAssetIds() public view returns (string[] memory) {
        return assetIds;
    }
}
